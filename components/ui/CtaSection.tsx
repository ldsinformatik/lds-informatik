import Link from 'next/link'

export default function CtaSection({ boutique }: { boutique: Record<string, string> }) {
  return (
    <section style={{ padding: '20px 32px 48px', background: 'var(--bg)' }}>
      <div style={{ background: 'linear-gradient(135deg,#004AAD,#162a68)', borderRadius: '28px', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 800, marginBottom: '14px' }}>
          Besoin d'une assistance informatique ?
        </h2>
        <p style={{ fontSize: '14px', opacity: .85, maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.7 }}>
          Passez directement en boutique sans rendez-vous ou contactez-nous — nous répondons sous 2h.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/reparer" style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--primary)', background: '#fff', border: 'none', padding: '13px 26px', borderRadius: '13px', cursor: 'pointer', transition: 'all .2s', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            Demander un devis →
          </Link>
          <a href={`tel:${(boutique.tel || '0745014127').replace(/\s/g,'')}`} style={{ fontSize: '13.5px', fontWeight: 600, color: '#fff', background: 'transparent', border: '1.5px solid rgba(255,255,255,.4)', padding: '13px 24px', borderRadius: '13px', cursor: 'pointer', transition: 'all .2s', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            📞 {boutique.tel || '07 45 01 41 27'}
          </a>
        </div>
        <p style={{ fontSize: '12px', opacity: .6, marginTop: '20px' }}>
          145 Av. Pierre Brossolette, 10000 Troyes · Lun-Ven 9h30-18h30 · Sam 9h30-14h
        </p>
      </div>
    </section>
  )
}
