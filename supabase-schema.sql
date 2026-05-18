-- ═══════════════════════════════════════════════════════════
--  LDS INFORMATIK — Schéma Supabase complet
--  Coller dans : Supabase > SQL Editor > New Query > Run
-- ═══════════════════════════════════════════════════════════

-- Extensions
create extension if not exists "uuid-ossp";

-- ── PROFILS CLIENTS (lié à auth.users) ──────────────────────
create table public.profiles (
  id            uuid references auth.users on delete cascade primary key,
  email         text not null,
  nom           text,
  prenom        text,
  telephone     text,
  entreprise    text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Les utilisateurs voient leur propre profil"
  on public.profiles for select using (auth.uid() = id);
create policy "Les utilisateurs modifient leur propre profil"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── TARIFS RÉPARATION ────────────────────────────────────────
create table public.tarifs (
  id          uuid default uuid_generate_v4() primary key,
  categorie   text not null check (categorie in ('smartphone','pc','tablette','autre')),
  ico         text default '🔧',
  nom         text not null,
  description text,
  prix_min    integer default 0,
  prix_max    integer default 0,
  visible     boolean default true,
  ordre       integer default 0,
  created_at  timestamptz default now()
);
alter table public.tarifs enable row level security;
create policy "Tarifs publics en lecture" on public.tarifs for select using (visible = true);
create policy "Admin peut tout faire sur tarifs" on public.tarifs for all using (auth.role() = 'service_role');

insert into public.tarifs (categorie, ico, nom, description, prix_min, prix_max, ordre) values
('smartphone','📱','Remplacement écran','Écran fissuré ou tactile défaillant.',79,299,1),
('smartphone','🔋','Remplacement batterie','Autonomie réduite ou décharge rapide.',49,89,2),
('smartphone','🔌','Connecteur de charge','Problème de charge ou connexion instable.',59,89,3),
('smartphone','🛡','Remplacement châssis','Coque abîmée, déformée ou fendue.',89,199,4),
('smartphone','🔊','Remplacement haut-parleur','Son absent ou grésillements.',59,89,5),
('smartphone','🔍','Diagnostic','Autre panne — enquête avant devis.',0,0,6),
('pc','💻','Remplacement écran','Dalle cassée ou défaillante.',99,349,1),
('pc','🔋','Remplacement batterie','Autonomie réduite.',79,149,2),
('pc','⌨️','Remplacement clavier','Touches bloquées ou cassées.',89,199,3),
('pc','🖱','Remplacement trackpad','Pavé tactile défectueux.',99,229,4),
('pc','🔌','Connecteur de charge','Problème de charge.',89,149,5),
('pc','🖥','Remplacement topcase','Repose-mains ou coque supérieure.',149,399,6),
('pc','🌬','Nettoyage ventilation','PC qui chauffe, ventilo bruyant.',49,79,7),
('pc','💿','Réinstallation OS','Windows ou macOS.',79,99,8),
('pc','🔍','Diagnostic','Panne non identifiée.',0,0,9);

-- ── PRODUITS ────────────────────────────────────────────────
create table public.produits (
  id          uuid default uuid_generate_v4() primary key,
  categorie   text not null check (categorie in ('smartphone','pc','tablette','accessoire')),
  marque      text,
  nom         text not null,
  description text,
  prix        integer not null default 0,
  etat        text default 'Très bon état' check (etat in ('Neuf','Très bon état','Bon état','État correct')),
  specs       text[] default '{}',
  images      text[] default '{}',
  stock       integer default 1,
  visible     boolean default true,
  ordre       integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
alter table public.produits enable row level security;
create policy "Produits publics" on public.produits for select using (visible = true and stock > 0);
create policy "Admin produits" on public.produits for all using (auth.role() = 'service_role');

insert into public.produits (categorie, marque, nom, description, prix, etat, specs, stock) values
('smartphone','Apple','iPhone 14 Pro 256Go Argent','Écran parfait, Face ID fonctionnel, batterie 88%.',699,'Très bon état',ARRAY['256 Go','Face ID','Caméra 48MP','5G'],1),
('pc','Apple','MacBook Air M2 256Go Minuit','Aucune rayure, batterie 91%, chargeur inclus.',899,'Très bon état',ARRAY['Apple M2','8 Go RAM','256 Go SSD','13.6" Retina'],1),
('smartphone','Samsung','Galaxy S23 128Go Phantom Black','Micro-rayures au dos, écran parfait.',449,'Bon état',ARRAY['128 Go','50MP','5G','6.1"'],2);

-- ── RÉSERVATIONS PRODUITS ────────────────────────────────────
create table public.reservations (
  id            uuid default uuid_generate_v4() primary key,
  ref           text unique not null,
  client_id     uuid references public.profiles(id) on delete set null,
  client_nom    text not null,
  client_email  text not null,
  client_tel    text,
  produit_id    uuid references public.produits(id) on delete set null,
  produit_nom   text not null,
  produit_prix  integer not null,
  message       text,
  statut        text default 'nouvelle' check (statut in ('nouvelle','confirmée','annulée','récupérée')),
  notes_admin   text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
alter table public.reservations enable row level security;
create policy "Clients voient leurs réservations"
  on public.reservations for select using (auth.uid() = client_id);
create policy "Clients créent des réservations"
  on public.reservations for insert with check (true);
create policy "Admin réservations"
  on public.reservations for all using (auth.role() = 'service_role');

-- ── DEMANDES RÉPARATION ──────────────────────────────────────
create table public.demandes (
  id            uuid default uuid_generate_v4() primary key,
  ref           text unique not null,
  type          text not null check (type in ('reparation','pc_sur_mesure','infogerance','contact')),
  client_id     uuid references public.profiles(id) on delete set null,
  client_nom    text not null,
  client_email  text not null,
  client_tel    text,
  entreprise    text,
  -- Réparation
  appareil      text,
  marque        text,
  modele        text,
  prestations   text[],
  -- PC sur mesure
  budget        text,
  usage         text,
  -- Infogérance
  nb_postes     text,
  besoins       text,
  -- Commun
  message       text,
  statut        text default 'nouveau' check (statut in ('nouveau','en_attente','en_cours','termine','annule')),
  notes_admin   text,
  timeline      jsonb default '[]',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
alter table public.demandes enable row level security;
create policy "Clients voient leurs demandes"
  on public.demandes for select using (auth.uid() = client_id);
create policy "Tout le monde peut créer une demande"
  on public.demandes for insert with check (true);
create policy "Admin demandes"
  on public.demandes for all using (auth.role() = 'service_role');

-- ── AVIS CLIENTS ────────────────────────────────────────────
create table public.avis (
  id          uuid default uuid_generate_v4() primary key,
  nom         text not null,
  note        integer default 5 check (note between 1 and 5),
  date_texte  text,
  contenu     text not null,
  actif       boolean default true,
  ordre       integer default 0,
  created_at  timestamptz default now()
);
alter table public.avis enable row level security;
create policy "Avis actifs publics" on public.avis for select using (actif = true);
create policy "Admin avis" on public.avis for all using (auth.role() = 'service_role');

insert into public.avis (nom, note, date_texte, contenu, ordre) values
('Wesley Maestro',5,'il y a un an','"Intervention rapide, prix top, vous pouvez aller les yeux fermés."',1),
('Jérome Toutof',5,'il y a un mois','"J''ai fait l''acquisition d''un iPad pour ma soeur. Très satisfaite de son cadeau !"',2),
('Sofiane',5,'il y a un mois','"Réponse très rapide. Réparation effectuée dans la même journée."',3),
('Stacy Compan',5,'il y a un mois','"Le gérant est très sympathique et professionnel."',4),
('El Habib Fessla',5,'il y a un mois','"Achat d''un ordinateur à très bon prix et service client rapide."',5),
('Laeticia Massoudom',5,'il y a un mois','"Vendeur très gentil et à l''écoute."',6),
('Angel Jimenez',5,'il y a un an','"Super service, je recommande."',7),
('Caroline M.',5,'il y a 2 mois','"Réparation rapide et soignée, prix honnête."',8);

-- ── FAQ ─────────────────────────────────────────────────────
create table public.faq (
  id          uuid default uuid_generate_v4() primary key,
  question    text not null,
  reponse     text not null,
  visible     boolean default true,
  ordre       integer default 0
);
alter table public.faq enable row level security;
create policy "FAQ publique" on public.faq for select using (visible = true);
create policy "Admin FAQ" on public.faq for all using (auth.role() = 'service_role');

insert into public.faq (question, reponse, ordre) values
('Combien coûte une réparation ?','Le diagnostic est toujours gratuit et sans engagement. Le prix dépend de la panne et de l''appareil.',1),
('Faut-il prendre rendez-vous ?','Non, vous pouvez passer directement en boutique sans rendez-vous.',2),
('Quels appareils réparez-vous ?','Smartphones toutes marques, PC portables Mac et Windows, tablettes.',3),
('Quel est le délai de réparation ?','La plupart des réparations sont effectuées le jour même ou sous 24h.',4),
('Mes données sont-elles en sécurité ?','Nous ne touchons jamais à vos données personnelles.',5),
('Quelle garantie sur les réparations ?','Jusqu''à 3 ans sur les pièces et la main d''œuvre.',6),
('Paiement en plusieurs fois ?','Oui, dès 100€ par carte bancaire.',7);

-- ── PARTENAIRES ─────────────────────────────────────────────
create table public.partenaires (
  id      uuid default uuid_generate_v4() primary key,
  nom     text not null,
  logo    text,
  url     text,
  ordre   integer default 0,
  actif   boolean default true
);
alter table public.partenaires enable row level security;
create policy "Partenaires publics" on public.partenaires for select using (actif = true);
create policy "Admin partenaires" on public.partenaires for all using (auth.role() = 'service_role');

insert into public.partenaires (nom, ordre) values
('Microsoft',1),('Kaspersky',2),('Lenovo',3),('Apple',4),('ASUS',5),('EBP',6),
('Ma-Sauvegarde',7),('WatchGuard',8),('Samsung',9),('Dell',10),('HP',11);

-- ── CONFIG SITE (clé/valeur) ─────────────────────────────────
create table public.config (
  cle     text primary key,
  valeur  jsonb not null,
  updated_at timestamptz default now()
);
alter table public.config enable row level security;
create policy "Config publique" on public.config for select using (true);
create policy "Admin config" on public.config for all using (auth.role() = 'service_role');

insert into public.config (cle, valeur) values
('boutique', '{
  "nom": "LDS INFORMATIK",
  "adresse": "145 Avenue Pierre Brossolette",
  "cp": "10000",
  "ville": "Troyes",
  "tel": "07 45 01 41 27",
  "email": "contact@ldsinformatik.fr",
  "email_cc": "troyes@ldsinformatik.fr",
  "siret": "94895280900044",
  "tva": "FR07948952809",
  "gerant": "MORAND Ludovic",
  "facebook": "https://www.facebook.com/ldsinformatik10",
  "instagram": "https://www.instagram.com/ldsinformatik",
  "tiktok": "https://www.tiktok.com/@ldsinformatik",
  "google_avis": "https://share.google/DMnd40szJ82iOlb9I",
  "teamviewer": "https://teamviewer.com/ldsinformatik",
  "whatsapp": "33745014127"
}'::jsonb),
('horaires', '[
  {"jour":"Lundi","ouvert":true,"matin":"09:30-13:00","aprem":"14:30-18:30"},
  {"jour":"Mardi","ouvert":true,"matin":"09:30-13:00","aprem":"14:30-18:30"},
  {"jour":"Mercredi","ouvert":true,"matin":"09:30-13:00","aprem":"14:30-18:30"},
  {"jour":"Jeudi","ouvert":true,"matin":"09:30-13:00","aprem":"14:30-18:30"},
  {"jour":"Vendredi","ouvert":true,"matin":"09:30-13:00","aprem":"14:30-18:30"},
  {"jour":"Samedi","ouvert":true,"matin":"09:30-14:00","aprem":""},
  {"jour":"Dimanche","ouvert":false,"matin":"","aprem":""}
]'::jsonb),
('trust', '[
  {"valeur":"10 ans","label":"D''expertise terrain"},
  {"valeur":"99,9 %","label":"Clients satisfaits"},
  {"valeur":"3 ans","label":"Garantie incluse"}
]'::jsonb),
('zones', '["Troyes","Aube","Saint-André-les-Vergers","Sainte-Savine","La Chapelle-Saint-Luc","Saint-Julien-les-Villas","Pont-Sainte-Marie","Barberey-Saint-Sulpice","Rosières-près-Troyes","Bar-sur-Aube","Bar-sur-Seine","Nogent-sur-Seine","Romilly-sur-Seine","Arcis-sur-Aube","Chaource","Ervy-le-Châtel","Les Riceys","Vitry-le-François","Brienne-le-Château","Vendeuvre-sur-Barse","Mussy-sur-Seine","Vendœuvres"]'::jsonb);

-- ── FONCTIONS UTILITAIRES ────────────────────────────────────

-- Génère une référence unique (ex: REP-20240518-AB3F)
create or replace function generate_ref(prefix text)
returns text language plpgsql as $$
declare
  ref text;
begin
  ref := prefix || '-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substring(md5(random()::text), 1, 4));
  return ref;
end;
$$;

-- Trigger updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger trg_profiles_updated_at before update on public.profiles for each row execute function update_updated_at();
create trigger trg_produits_updated_at before update on public.produits for each row execute function update_updated_at();
create trigger trg_demandes_updated_at before update on public.demandes for each row execute function update_updated_at();
create trigger trg_reservations_updated_at before update on public.reservations for each row execute function update_updated_at();
