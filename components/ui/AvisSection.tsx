import type { Avis } from '@/types/database'
import Link from 'next/link'

export default function AvisSection({ avis }: { avis: Avis[] }) {
  // 6 avis max
  const displayed = avis.slice(0, 6)
  return (
    <section style={{ background: 'var(--bg)' }}>
      <div className="sh" style={{ padding: '56px 32px 36px', background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <div className="stag reveal">Avis clients</div>
        <div className="stitle reveal">Ce que disent <strong>nos clients</strong></div>
        <div className="ssub reveal">
          <span style={{ color: '#F59E0B', letterSpacing: '2px' }}>⭐⭐⭐⭐⭐</span> 5/5 sur Google ·{' '}
          <a href="https://share.google/DMnd40szJ82iOlb9I" target="_blank" rel="noopener" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Voir tous nos avis →</a>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', padding: '40px 32px 48px' }} className="avis-grid">
        {displayed.map((a, i) => (
          <div key={a.id} className={`review card-hover reveal reveal-d${(i%6)+1}`} style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '24px', boxShadow: 'var(--shadow)' }}>
            <div style={{ color: '#F59E0B', fontSize: '14px', marginBottom: '12px' }}>{'⭐'.repeat(a.note)}</div>
            <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.65, fontStyle: 'italic' }}>{a.contenu}</p>
            <strong style={{ display: 'block', marginTop: '14px', fontSize: '13px', color: 'var(--secondary)' }}>{a.nom}</strong>
            <span style={{ fontSize: '11px', color: 'var(--gray)' }}>{a.date_texte}</span>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.avis-grid{grid-template-columns:1fr!important;}}@media(min-width:769px) and (max-width:1024px){.avis-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </section>
  )
}
