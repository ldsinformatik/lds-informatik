'use client'

import Link from 'next/link'
import { useState } from 'react'

const zones = ['Troyes','Aube','Saint-André-les-Vergers','Sainte-Savine','La Chapelle-Saint-Luc','Saint-Julien-les-Villas','Pont-Sainte-Marie','Barberey-Saint-Sulpice','Rosières-près-Troyes','Bar-sur-Aube','Bar-sur-Seine','Nogent-sur-Seine','Romilly-sur-Seine','Arcis-sur-Aube','Chaource','Ervy-le-Châtel','Les Riceys','Vitry-le-François','Brienne-le-Château','Vendeuvre-sur-Barse','Mussy-sur-Seine','Vendœuvres']

export default function Footer({ boutique }: { boutique: Record<string, string> }) {
  const year = new Date().getFullYear()
  const [modal, setModal] = useState<string | null>(null)
  return (
    <footer className="footer" style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '40px 32px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '32px' }} className="footer-grid">

        {/* Col 1 — Brand */}
        <div className="footer-col">
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '12px' }}>
            LDS <span style={{ color: 'var(--primary)' }}>INFORMATIK</span>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--gray)', lineHeight: 1.7, marginBottom: '16px' }}>
            Votre expert informatique à Troyes depuis 2023. Réparation, vente et services B2B pour particuliers et professionnels.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { href: boutique.facebook || '#', label: 'FB', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              { href: boutique.instagram || '#', label: 'IG', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              { href: boutique.tiktok || '#', label: 'TK', svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" style={{ width: '34px', height: '34px', borderRadius: '9px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)', textDecoration: 'none', transition: 'all .18s' }}>{s.svg}</a>
            ))}
          </div>
        </div>

        {/* Col 2 — Services */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link href="/Réparer" style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '12.5px' }}>Réparation</Link></li>
            <li><Link href="/PC sur mesure" style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '12.5px' }}>PC sur mesure</Link></li>
            <li><Link href="/Infogerance" style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '12.5px' }}>Infogérance B2B</Link></li>
            <li><a href={boutique.teamviewer || 'https://get.teamviewer.com/ldsinformatik'} target="_blank" rel="noopener" style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '12.5px' }}>Assistance à distance</a></li>
          </ul>
        </div>

        {/* Col 3 — Entreprise */}
        <div className="footer-col">
          <h4>Entreprise</h4>
          <ul>
            <li><span style={{ color: 'var(--gray)', fontSize: '12.5px', cursor: 'pointer' }}>À propos</span></li>
            <li><a href={boutique.google_avis || 'https://share.google/DMnd40szJ82iOlb9I'} target="_blank" rel="noopener" style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '12.5px' }}>Avis clients</a></li>
            <li><Link href="/contact" style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '12.5px' }}>Contact</Link></li>
            <li><Link href="/espace-client/connexion" style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '12.5px' }}>Espace client</Link></li>
          </ul>
        </div>

        {/* Col 4 — Légal */}
<div className="footer-col">
  <h4>Infos légales</h4>

  <ul>
    <li>
      <span
        onClick={() => setModal('cgv')}
        style={{
          color: 'var(--gray)',
          fontSize: '12.5px',
          cursor: 'pointer',
        }}
      >
        CGV
      </span>
    </li>

    <li>
      <span
        onClick={() => setModal('conf')}
        style={{
          color: 'var(--gray)',
          fontSize: '12.5px',
          cursor: 'pointer',
        }}
      >
        Confidentialité
      </span>
    </li>

    <li>
      <span
        onClick={() => setModal('mentions')}
        style={{
          color: 'var(--gray)',
          fontSize: '12.5px',
          cursor: 'pointer',
        }}
      >
        Mentions légales
      </span>
    </li>
  </ul>
</div>

        {/* Col 5 — Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li style={{ fontSize: '12.5px', color: 'var(--gray)' }}>📍 {boutique.adresse || '145 Av. Pierre Brossolette'}</li>
            <li style={{ fontSize: '12.5px', color: 'var(--gray)' }}>{boutique.cp || '10000'} {boutique.ville || 'Troyes'}</li>
            <li><a href={`tel:${(boutique.tel || '0745014127').replace(/\s/g,'')}`} style={{ fontSize: '12.5px', color: 'var(--gray)', textDecoration: 'none' }}>📞 {boutique.tel || '07 45 01 41 27'}</a></li>
            <li><a href={`mailto:${boutique.email || 'contact@ldsinformatik.fr'}`} style={{ fontSize: '12.5px', color: 'var(--gray)', textDecoration: 'none' }}>✉️ {boutique.email || 'contact@ldsinformatik.fr'}</a></li>
            <li style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>Lun-Ven 9h30-13h / 14h30-18h30</li>
            <li style={{ fontSize: '12px', color: 'var(--gray)' }}>Sam 9h30-14h</li>
          </ul>
        </div>
      </div>

      {/* Zones desservies */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginBottom: '16px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '10px' }}>Zones desservies</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {zones.map(z => (
            <span key={z} style={{ fontSize: '11.5px', color: 'var(--primary)', background: 'rgba(0,74,173,.07)', padding: '3px 10px', borderRadius: '99px', fontWeight: 500 }}>{z}</span>
          ))}
        </div>
      </div>

      <div className="footer-bot" style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', fontSize: '12px', color: 'var(--gray)', textAlign: 'center' }}>
        © {year} LDS INFORMATIK — Tous droits réservés
      </div>
{/* MODALS */}
{modal && (
  <div
    onClick={() => setModal(null)}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,.55)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: '#fff',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '85vh',
        overflowY: 'auto',
        borderRadius: '24px',
        padding: '32px',
        position: 'relative',
      }}
    >
      <button
        onClick={() => setModal(null)}
        style={{
          position: 'absolute',
          top: '18px',
          right: '18px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: '#f3f4f6',
        }}
      >
        ✕
      </button>

      {modal === 'mentions' && (
        <>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '20px' }}>
            Mentions légales
          </h2>

          <div style={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: '#555', fontSize: '14px' }}>
{`CMentions légales : 

En vigueur au 21/08/2025

Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l'économie numérique, il est porté à la connaissance des utilisateurs et visiteurs, du site www.ldsinformatik.fr, les présentes mentions légales.

La connexion et la navigation sur le Site par l'Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales. Ces dernières sont accessibles sur le Site à la rubrique "Mentions légales".

Édition du site
L'édition du Site est assurée par la société LDS INFORMATIK, EURL au capital de 1 000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 948 952 809 dont le siège social est situé au 61 rue de Lyon, 75012 Paris.

Numéro de téléphone : 07 45 01 41 27
Adresse e-mail : contact@ldsinformatik.fr
N° de TVA intracommunautaire : FR07948952809
Directeur de la publication : MORAND Ludovic
Hébergeur
L'hébergeur du Site est la société LWS (Ligne Web Services), dont le siège social est situé au 10 rue Penthièvre, 75008 Paris. Téléphone : 01 77 62 30 03.

Accès au site
Le Site est normalement accessible, à tout moment, à l'Utilisateur. Toutefois, l'Éditeur pourra, à tout moment, suspendre, limiter ou interrompre le Site afin de procéder, notamment, à des mises à jour ou des modifications de son contenu. L'Éditeur ne pourra en aucun cas être tenu responsable des conséquences éventuelles de cette indisponibilité sur les activités de l'Utilisateur.

Collecte des données
Le Site assure à l'Utilisateur une collecte et un traitement des données personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 et au règlement (UE) 2016/679 du 27 avril 2016 (RGPD).

En vertu de la réglementation applicable, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur peut exercer ce droit :

Par mail : contact@ldsinformatik.fr
Par voie postale : LDS INFORMATIK – 61 rue de Lyon, 75012 Paris
Depuis le formulaire de contact du site
Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans autorisation expresse de l'Éditeur est prohibée et pourra entraîner des actions et poursuites judiciaires telles que prévues par la réglementation en vigueur.`}
          </div>
        </>
      )}

      {modal === 'cgv' && (
        <>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '20px' }}>
            Conditions Générales de Vente
          </h2>

          <div style={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: '#555', fontSize: '14px' }}>
{`CGV : 

Dernière mise à jour : 22 avril 2026

1. Préambule
Les présentes Conditions Générales de Vente (« CGV ») régissent l'ensemble des prestations de réparation et de vente réalisées par LDS INFORMATIK, 145 Avenue Pierre Brossolette, 10000 Troyes, immatriculée sous le numéro SIRET 94895280900044 (« le Prestataire »), au profit de tout Client consommateur. Toute commande emporte acceptation pleine et entière des présentes CGV.

2. Objet
Les présentes CGV définissent les droits et obligations des parties dans le cadre des prestations proposées par le Prestataire : réparation d'appareils (téléphones, tablettes, ordinateurs, équipements électroniques), vente de pièces détachées et accessoires, diagnostic, devis et conseil.

3. Commande et devis
Toute intervention fait l'objet d'un diagnostic préalable suivi d'un devis précisant la nature de la panne, les pièces à remplacer, leur origine (neuves, reconditionnées ou d'occasion conformément à l'article L111-4 du Code de la consommation), le coût TTC et les délais prévisionnels. L'acceptation du devis vaut commande ferme.

4. Prix et modalités de paiement
Les prix sont en euros TTC. Le paiement s'effectue comptant à la restitution de l'appareil (espèces, carte bancaire, virement). Un acompte peut être demandé pour les pièces spécifiques. Tout retard de paiement entraîne des pénalités au taux de trois fois le taux d'intérêt légal, ainsi qu'une indemnité forfaitaire de 40 €.

5. Origine des pièces détachées
Conformément à l'article L111-4 du Code de la consommation et au décret n° 2022-105 du 31 janvier 2022, le Client est informé de la possibilité de choisir entre pièces neuves ou issues de l'économie circulaire. L'origine est indiquée sur le devis et reprise sur la facture.

6. Délais d'intervention
Les délais communiqués sont indicatifs. Le Prestataire s'engage à informer le Client de tout allongement significatif dû à une rupture d'approvisionnement ou à une panne supplémentaire découverte lors de l'intervention.

7. Droit de rétractation
Conformément à l'article L221-18 du Code de la consommation, le Client dispose d'un délai de 14 jours francs pour exercer son droit de rétractation pour les contrats conclus à distance ou hors établissement. Toutefois, conformément à l'article L221-28 5°, en acceptant le devis et en demandant le démarrage immédiat de la prestation, le Client reconnaît perdre ce droit dès que la prestation est pleinement exécutée.

Pour exercer ce droit : courrier à LDS INFORMATIK, 145 Avenue Pierre Brossolette, 10000 Troyes, ou email à contact@ldsinformatik.fr.

8. Garanties légales
Garantie légale de conformité (art. L217-3 à L217-20 C. conso.) : 2 ans pour les biens neufs, 1 an minimum pour les biens d'occasion. Garantie des vices cachés (art. 1641 C. civil) : le Client peut demander résolution ou réduction de prix. Garantie commerciale : durée et conditions précisées sur la facture ; exclut les dommages consécutifs à une mauvaise utilisation, chute, immersion ou intervention d'un tiers.

9. Obligations du Client
Le Client s'engage à fournir les informations nécessaires à l'intervention, à sauvegarder ses données avant le dépôt (le Prestataire ne pouvant être tenu responsable de leur perte), et à retirer son appareil dans les délais convenus.

10. Appareils non réclamés
À défaut de retrait dans un délai d'1 an après notification de mise à disposition, et après mise en demeure par LRAR restée infructueuse, le Prestataire pourra disposer librement de l'appareil (revente, recyclage, destruction). Des frais de gardiennage peuvent s'appliquer.

11. Limitation de responsabilité
La responsabilité du Prestataire est limitée au montant de la prestation facturée. Il n'est pas responsable des dommages indirects (perte d'exploitation, perte de données, préjudice moral) ni des cas de force majeure.

12. Protection des données personnelles
Les données collectées sont traitées conformément à notre politique de confidentialité. Droits d'accès, rectification, effacement et opposition à exercer à troyes@ldsinformatik.fr.

13. Médiation de la consommation
Conformément aux articles L611-1 et suivants du Code de la consommation, le Client peut recourir gratuitement à un médiateur après réclamation écrite préalable au Prestataire. Plateforme européenne de RLL : https://ec.europa.eu/consumers/odr.

14. Droit applicable et juridiction
Les présentes CGV sont régies par le droit français. Tout litige non résolu à l'amiable relève de la compétence des tribunaux français.

15. Contact
LDS INFORMATIK - 145 Avenue Pierre Brossolette, 10000 Troyes
Email : contact@ldsinformatik.fr - Tél : 07 45 01 41 27`}
          </div>
        </>
      )}

      {modal === 'conf' && (
        <>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '20px' }}>
            Politique de confidentialité
          </h2>

          <div style={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: '#555', fontSize: '14px' }}>
{`Politique de confidentialité
✕
Dernière mise à jour : 22 avril 2026

1. Préambule
LDS INFORMATIK accorde une importance essentielle au respect de la vie privée et à la protection des données à caractère personnel qui lui sont confiées, dans le respect du RGPD (UE) 2016/679 et de la Loi Informatique et Libertés n° 78-17 du 6 janvier 1978 modifiée.

2. Responsable de traitement
LDS INFORMATIK
145 Avenue Pierre Brossolette, 10000 Troyes
Téléphone : 07 45 01 41 27
Email : contact@ldsinformatik.fr

3. Données collectées et finalités
Données d'identification (nom, prénom, adresse, email, téléphone) - exécution du contrat, facturation, communications.
Données relatives à l'appareil (marque, modèle, numéro de série, description de la panne) - réalisation de la prestation.
Données de facturation (historique, factures - sans conservation des numéros de carte) - obligations comptables et fiscales.
Données de communication (emails, SMS) - suivi du dossier.
Données de consentement (date/heure) - preuve de la licéité du traitement.
4. Bases légales du traitement
Exécution du contrat (art. 6.1.b RGPD) - réparation, facturation, suivi client.
Obligation légale (art. 6.1.c RGPD) - conservation des factures et documents comptables.
Intérêt légitime (art. 6.1.f RGPD) - sécurité, prévention de la fraude, amélioration des services.
Consentement (art. 6.1.a RGPD) - communications commerciales et prise de rendez-vous en ligne, retirable à tout moment.
5. Durées de conservation
Client actif - durée de la relation commerciale.
Client inactif - 3 ans après la dernière interaction (recommandation CNIL).
Factures et pièces comptables - 10 ans (art. L123-22 C. commerce).
Données fiscales - 6 ans (art. L102 B LPF).
Consentement - durée de la relation, puis 3 ans comme preuve.
6. Destinataires et sous-traitants
Vos données sont destinées aux personnels habilités de LDS INFORMATIK. Elles peuvent être transmises à :

Mon Atelier (logiciel de gestion), sous-traitant au sens de l'art. 28 RGPD.
DigitalOcean, LLC, hébergeur - région Amsterdam (Pays-Bas, UE).
Partenaires de paiement pour les transactions bancaires.
Autorités administratives et judiciaires, si la loi l'exige.
Nous ne vendons, ne louons et ne cédons en aucun cas vos données à des tiers à des fins commerciales.

7. Transferts hors Union européenne
Vos données sont hébergées exclusivement au sein de l'UE (Amsterdam, Pays-Bas). Aucun transfert hors UE n'est effectué dans le cadre normal de nos prestations. Si un tel transfert s'avérait nécessaire, il serait encadré par les garanties prévues aux articles 44 à 49 du RGPD.

8. Sécurité des données
Nous mettons en œuvre des mesures techniques et organisationnelles appropriées (art. 32 RGPD) : chiffrement des communications, contrôle des accès, journalisation des opérations sensibles, sauvegardes régulières et sensibilisation du personnel.

9. Vos droits
Conformément au RGPD, vous disposez des droits suivants :

Accès (art. 15) - obtenir une copie de vos données.
Rectification (art. 16) - corriger les données inexactes.
Effacement (art. 17) - supprimer vos données dans les cas prévus.
Limitation (art. 18) - suspendre temporairement le traitement.
Portabilité (art. 20) - recevoir vos données dans un format lisible.
Opposition (art. 21) - vous opposer au traitement.
Retrait du consentement (art. 7.3) - à tout moment.
Directives post-mortem (art. 85 LIL) - relatives au sort de vos données après décès.
Exercice des droits : contact@ldsinformatik.fr ou courrier à 145 Avenue Pierre Brossolette, 10000 Troyes. Réponse sous 1 mois maximum.

10. Réclamation auprès de la CNIL
Vous pouvez adresser une réclamation à la CNIL - 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 - Tél : 01 53 73 22 22 - www.cnil.fr

11. Cookies et traceurs
Le site est propulsé par Vercel. L'utilisation de cookies est encadrée par sa politique globale, accessible via le bandeau de consentement affiché lors de votre première visite.

12. Modifications
Nous nous réservons le droit de modifier cette politique à tout moment. La date de dernière mise à jour est indiquée en tête du document.

13. Contact
contact@ldsinformatik.fr - 07 45 01 41 27`}
          </div>
        </>
      )}
    </div>
  </div>
)}
      <style>{`
        @media(max-width:768px){
          .footer-grid{grid-template-columns:1fr 1fr!important;}
          .footer-col:first-child{grid-column:1/-1;}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr!important;}
        }
      `}</style>
    </footer>
  )
}
