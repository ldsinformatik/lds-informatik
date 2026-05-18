const items = [
  { ico: '💰', titre: 'Tarifs fixes sans mauvaise surprise', desc: 'Devis gratuit avant toute intervention. Le prix annoncé est le prix payé.' },
  { ico: '🤝', titre: 'Interlocuteur dédié', desc: 'Un accompagnement 100% personnalisé. Ludovic répond directement.' },
  { ico: '💳', titre: 'Paiement en plusieurs fois', desc: 'Dès 100€ par carte bancaire, sans frais cachés.' },
  { ico: '🛡️', titre: "Jusqu'à 3 ans de garantie", desc: "Sur les pièces et la main d'œuvre pour tous vos achats et réparations." },
]

export default function PourquoiLDS() {
  return (
    <section style={{ background: '#fff' }}>
      <div className="sh" style={{ padding: '56px 32px 36px', background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <div className="stag reveal">Pourquoi nous choisir</div>
        <div className="stitle reveal">Pourquoi choisir <strong>LDS INFORMATIK</strong> ?</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px', padding: '40px 32px 48px' }} className="pq-grid">
        {items.map((item, i) => (
          <div key={item.titre} className={`card-static card-hover reveal reveal-d${i+1}`} style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '28px', boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,.04)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{item.ico}</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{item.titre}</div>
            <div style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:560px){.pq-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
