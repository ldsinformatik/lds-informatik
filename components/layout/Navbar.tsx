'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/accueil', label: 'Accueil' },
  { href: '/acheter', label: 'Achetez' },
  { href: '/reparer', label: 'Réparez' },
  { href: '/infogerance', label: 'Infogérance' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar({ boutique, isLoggedIn }: { boutique: Record<string, string>; isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const active = (href: string) => path === href || path.startsWith(href + '/')

  return (
    <>
      <nav style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', padding: '0 24px', height: '62px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 200 }}>
        <Link href="/accueil" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--secondary)', textDecoration: 'none' }} className="logo">
          LDS <span style={{ color: 'var(--primary)' }}>INFORMATIK</span>
        </Link>

        <div className="nav-links" style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: '13px', fontWeight: 500, padding: '6px 13px', borderRadius: '8px', textDecoration: 'none', transition: 'all .18s', color: active(l.href) ? 'var(--primary)' : '#374151', background: active(l.href) ? 'var(--light)' : 'transparent' }}>
              {l.label}
            </Link>
          ))}
        </div>

        <<div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
          <div className="nav-social" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {[
              { href: boutique.facebook || 'https://www.facebook.com/ldsinformatik10', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              { href: boutique.instagram || 'https://www.instagram.com/ldsinformatik', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              { href: boutique.tiktok || 'https://www.tiktok.com/@ldsinformatik', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg> },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener" style={{ width: '34px', height: '34px', borderRadius: '9px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', textDecoration: 'none', transition: 'all .18s' }}>{s.svg}</a>
            ))}
          </div>
          <button onClick={() => setOpen(!open)} className="nav-burger" style={{ display: 'none', flexDirection: 'column', gap: '5px', cursor: 'pointer', padding: '6px', border: 'none', background: 'none', borderRadius: '8px', marginLeft:'auto' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--secondary)', borderRadius: '2px', transition: 'all .25s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--secondary)', borderRadius: '2px', opacity: open ? 0 : 1, transition: 'all .25s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--secondary)', borderRadius: '2px', transition: 'all .25s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav-drawer open" style={{ display: 'flex', position: 'fixed', top: '62px', left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', zIndex: 199, flexDirection: 'column', padding: '24px 20px', gap: '8px', borderTop: '1px solid var(--border)' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontSize: '16px', fontWeight: 600, color: active(l.href) ? 'var(--primary)' : 'var(--text)', padding: '14px 16px', borderRadius: '12px', textDecoration: 'none', background: active(l.href) ? 'var(--light)' : 'transparent', border: '1px solid transparent' }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
      <style>{`@media(max-width:768px){.nav-links,.nav-social{display:none!important;}.nav-burger{display:flex!important;}}`}</style>
    </>
  )
}
