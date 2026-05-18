'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

function BadgeHoraires() {
  const [statut, setStatut] = useState<'ouvert'|'ferme'>('ferme')
  useEffect(() => {
    const check = () => {
      const now = new Date(); const h = now.getHours() * 60 + now.getMinutes(); const d = now.getDay()
      let open = false
      if (d >= 1 && d <= 5) open = (h >= 570 && h <= 780) || (h >= 870 && h <= 1110)
      if (d === 6) open = h >= 570 && h <= 840
      setStatut(open ? 'ouvert' : 'ferme')
    }
    check(); const t = setInterval(check, 60000); return () => clearInterval(t)
  }, [])
  return (
    <div className="badge pulse-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,74,173,.08)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '999px', fontSize: '12.5px', fontWeight: 600, marginBottom: '20px' }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: statut === 'ouvert' ? '#0EA66E' : '#EF4444', display: 'inline-block' }} />
      {statut === 'ouvert' ? '🟢 Ouvert maintenant' : '🔴 Actuellement fermé'}
    </div>
  )
}

export default function HeroBanner({ boutique }: { boutique: Record<string, string> }) {
  return (
    <section className="hero-gradient-anim" style={{ padding: '56px 32px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', maxWidth: '1100px', margin: 'auto' }} className="hero-grid">

        {/* Gauche */}
        <div className="reveal">
          <BadgeHoraires />
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '18px' }}>
            Votre expert<br />
            <span style={{ color: '#7ac8ff' }}>informatique</span><br />
            à Troyes
          </h1>
          <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.75)', marginBottom: '28px', maxWidth: '520px', lineHeight: 1.7 }}>
            Depuis 2023, LDS INFORMATIK accompagne les particuliers et les professionnels pour tous leurs besoins informatiques et téléphonie.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <Link href="/reparer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600, color: '#fff', background: 'var(--primary)', border: 'none', padding: '13px 26px', borderRadius: '13px', boxShadow: '0 8px 20px rgba(0,74,173,.4)', transition: 'all .2s', textDecoration: 'none' }}>
              Demander un devis →
            </Link>
            <Link href="/acheter" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.3)', padding: '13px 24px', borderRadius: '13px', transition: 'all .2s', textDecoration: 'none' }}>
              Voir les produits
            </Link>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {['✅ Diagnostic gratuit', '⚡ Réparation le jour même', '🛡️ Garantie 3 ans', '💳 Paiement en plusieurs fois'].map(item => (
              <div key={item} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,.7)', display: 'flex', alignItems: 'center', gap: '6px' }}>{item}</div>
            ))}
          </div>
        </div>

        {/* Droite — card bleue */}
        <div className="reveal reveal-right">
          <div style={{ background: 'linear-gradient(135deg,#004AAD 0%,#162a68 100%)', borderRadius: '28px', padding: '36px', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 28px 56px rgba(0,74,173,.22)' }}>
            <div style={{ position: 'absolute', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', top: '-70px', right: '-55px' }} />
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>L'informatique pour</h3>
              <p style={{ opacity: .8, fontSize: '13px', marginBottom: '20px' }}>les particuliers et les professionnels</p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '10px' }}>
                {[
                  '🔧 Réparation smartphone & PC',
                  '🛍 Vente de matériel reconditionné',
                  '🏢 Infogérance & services B2B',
                  '💻 PC sur mesure',
                ].map(item => (
                  <li key={item} style={{ background: 'rgba(255,255,255,.09)', padding: '12px 16px', borderRadius: '12px', fontSize: '13.5px' }}>{item}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,.09)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>5⭐</div>
                <div style={{ fontSize: '11px', opacity: .7, marginTop: '3px' }}>Note Google</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,.09)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>2023</div>
                <div style={{ fontSize: '11px', opacity: .7, marginTop: '3px' }}>Fondé à Troyes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important;}
          .hero-grid > div:last-child{display:none;}
        }
      `}</style>
    </section>
  )
}
