import type { Partenaire } from '@/types/database'

const LOGOS: Record<string, string> = {
  'Kaspersky': 'https://www.kaspersky.fr/content/fr-fr/images/repository/isc/2022/kaspersky-logo.png',
  'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png',
  'Apple': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/100px-Apple_logo_black.svg.png',
  'Lenovo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/200px-Lenovo_logo_2015.svg.png',
  'ASUS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/200px-ASUS_Logo.svg.png',
  'Dell': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.png/200px-Dell_Logo.png',
  'HP': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/100px-HP_logo_2012.svg.png',
  'Samsung': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png',
}

export default function PartenairesCarousel({ partenaires }: { partenaires: Partenaire[] }) {
  // Double pour le scroll infini
  const all = [...partenaires, ...partenaires]
  return (
    <section style={{ background: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '28px 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Nos partenaires</p>
      </div>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div className="partners-track">
          {all.map((p, i) => (
            <div key={i} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '36px', minWidth: '100px' }}>
              {p.logo || LOGOS[p.nom]
                ? <img src={p.logo || LOGOS[p.nom]} alt={p.nom} style={{ maxHeight: '32px', maxWidth: '100px', objectFit: 'contain', filter: 'grayscale(1)', opacity: .6, transition: 'all .3s' }}
                    onMouseEnter={e => { (e.target as HTMLImageElement).style.filter = 'grayscale(0)'; (e.target as HTMLImageElement).style.opacity = '1'; }}
                    onMouseLeave={e => { (e.target as HTMLImageElement).style.filter = 'grayscale(1)'; (e.target as HTMLImageElement).style.opacity = '0.6'; }}
                  />
                : <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gray)', opacity: .6 }}>{p.nom}</span>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
