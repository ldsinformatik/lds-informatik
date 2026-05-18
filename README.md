# LDS INFORMATIK — Site Next.js

## Stack
- **Next.js 14** (App Router) — Frontend + API Routes
- **Supabase** — Base de données PostgreSQL + Auth
- **Vercel** — Hébergement
- **Resend** — Emails transactionnels
- **Tailwind CSS** — Styles

## Slugs (URLs)
| Page | URL |
|------|-----|
| Accueil | `/accueil` |
| Réparation | `/reparer` |
| Acheter | `/acheter` |
| Infogérance | `/infogerance` |
| Contact | `/contact` |
| Connexion client | `/espace-client/connexion` |
| Inscription client | `/espace-client/inscription` |
| Tableau de bord | `/espace-client/tableau-de-bord` |
| Mes réparations | `/espace-client/reparations` |
| Mes réservations | `/espace-client/commandes` |
| Admin dashboard | `/admin/tableau-de-bord` |
| Admin demandes | `/admin/demandes` |
| Admin réservations | `/admin/reservations` |
| Admin produits | `/admin/produits` |
| Admin avis | `/admin/avis` |
| Admin config | `/admin/config` |

## Mise en ligne — étape par étape

### 1. Supabase (5 min)
1. Aller sur [supabase.com](https://supabase.com) → New Project
2. Choisir une région Europe (Frankfurt)
3. Aller dans **SQL Editor** → New Query
4. Coller tout le contenu de `supabase-schema.sql` → **Run**
5. Aller dans **Project Settings → API** → copier :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Resend (2 min)
1. Aller sur [resend.com](https://resend.com) → créer un compte
2. API Keys → Create API Key → copier → `RESEND_API_KEY`
3. (Optionnel) Ajouter et vérifier votre domaine pour envoyer depuis `@ldsinformatik.fr`

### 3. GitHub (2 min)
```bash
cd lds-informatik
git init
git add .
git commit -m "Initial commit"
gh repo create lds-informatik --public --push
```

### 4. Vercel (5 min)
1. Aller sur [vercel.com](https://vercel.com) → New Project
2. Importer le repo GitHub
3. Dans **Environment Variables**, ajouter :
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   RESEND_API_KEY=...
   NOTIFICATION_EMAIL=contact@ldsinformatik.fr
   NOTIFICATION_EMAIL_CC=troyes@ldsinformatik.fr
   NEXT_PUBLIC_SITE_URL=https://ldsinformatik.fr
   ```
4. Deploy → votre site est en ligne sur `xxx.vercel.app`

### 5. Domaine personnalisé
Dans Vercel → Project Settings → Domains → ajouter `ldsinformatik.fr`
Puis chez votre registrar, ajouter les DNS indiqués par Vercel.

## Développement local
```bash
cp .env.local.example .env.local
# Remplir les variables
npm install
npm run dev
# → http://localhost:3000
```

## Structure des fichiers
```
app/
  (public)/           # Pages du site avec Navbar + Footer
    accueil/          → /accueil
    reparer/          → /reparer
    acheter/          → /acheter
    infogerance/      → /infogerance
    contact/          → /contact
    espace-client/    → /espace-client/*
  admin/              # Panneau admin
  api/                # API Routes
components/
  layout/             # Navbar, Footer
  ui/                 # Composants réutilisables
  forms/              # Formulaires
  shop/               # Catalogue produits
  admin/              # Composants admin
lib/
  supabase.ts         # Client Supabase
  utils.ts            # Fonctions utilitaires
types/
  database.ts         # Types TypeScript Supabase
```
