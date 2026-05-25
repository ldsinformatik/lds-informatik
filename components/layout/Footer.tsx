import Link from 'next/link'

const zones = ['Troyes','Aube','Saint-André-les-Vergers','Sainte-Savine','La Chapelle-Saint-Luc','Saint-Julien-les-Villas','Pont-Sainte-Marie','Barberey-Saint-Sulpice','Rosières-près-Troyes','Bar-sur-Aube','Bar-sur-Seine','Nogent-sur-Seine','Romilly-sur-Seine','Arcis-sur-Aube','Chaource','Ervy-le-Châtel','Les Riceys','Vitry-le-François','Brienne-le-Château','Vendeuvre-sur-Barse','Mussy-sur-Seine','Vendœuvres']

export default function Footer({ boutique }: { boutique: Record<string, string> }) {
  const year = new Date().getFullYear()
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
            <li><a href={boutique.teamviewer || 'https://teamviewer.com'} target="_blank" rel="noopener" style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '12.5px' }}>Assistance à distance</a></li>
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
            <li><span style={{ color: 'var(--gray)', fontSize: '12.5px', cursor: 'pointer' }}>CGV</span></li>
            <li><span style={{ color: 'var(--gray)', fontSize: '12.5px', cursor: 'pointer' }}>Confidentialité</span></li>
            <li><span style={{ color: 'var(--gray)', fontSize: '12.5px', cursor: 'pointer' }}>Mentions légales</span></li>
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
