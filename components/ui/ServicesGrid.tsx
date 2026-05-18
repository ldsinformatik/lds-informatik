import Link from 'next/link'

const services = [
  { ico: '🔧', name: 'Réparation', desc: 'Smartphone, PC portable, Mac, tablette — diagnostic gratuit, intervention rapide.', href: '/reparer', badge: 'Dès 49€' },
  { ico: '🖥', name: 'PC sur mesure', desc: 'Configuration personnalisée selon votre usage et votre budget.', href: '/acheter', badge: 'Sur devis' },
  { ico: '🛍', name: 'Vente reconditionnée', desc: 'Smartphones et PC reconditionnés testés, garantis, à prix honnêtes.', href: '/acheter', badge: 'En stock' },
  { ico: '🏢', name: 'Infogérance B2B', desc: 'Gestion de parc, assistance, cybersécurité pour TPE et PME.', href: '/infogerance', badge: 'Forfait mensuel' },
]

export default function ServicesGrid() {
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div style={{ padding: '56px 32px 36px', background: '#fff', borderBottom: '1px solid var(--border)' }} className="sh">
        <div className="stag reveal">Nos services</div>
        <div className="stitle reveal">Une offre complète pour <strong>particuliers</strong> & <strong>pros</strong></div>
        <div className="ssub reveal">Sans rendez-vous · Diagnostic gratuit · Garantie jusqu'à 3 ans</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px', padding: '48px 32px' }} className="cards-grid">
        {services.map((s, i) => (
          <Link key={s.name} href={s.href} style={{ textDecoration: 'none' }}>
            <div className={`card-static card-hover reveal reveal-d${i+1}`} style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '28px', boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,.04)', transition: 'all .2s', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10.5px', fontWeight: 700, color: 'var(--primary)', background: 'var(--light)', padding: '3px 10px', borderRadius: '20px' }}>{s.badge}</div>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '18px' }}>{s.ico}</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px' }}>{s.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.65 }}>{s.desc}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: 'var(--primary)', fontWeight: 600, marginTop: '14px' }}>En savoir plus →</div>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        @media(max-width:600px){.cards-grid{grid-template-columns:1fr!important;padding:24px 16px!important;}}
      `}</style>
    </section>
  )
}
