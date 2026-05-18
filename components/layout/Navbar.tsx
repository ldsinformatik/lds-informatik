'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/accueil', label: 'Accueil' },
  { href: '/reparer', label: 'Réparer' },
  { href: '/acheter', label: 'Acheter' },
  { href: '/infogerance', label: 'Infogérance' },
  { href: '/contact', label: 'Contact' },
]

interface NavbarProps {
  boutique: Record<string, string>
  isLoggedIn: boolean
}

export default function Navbar({ boutique, isLoggedIn }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#021634]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-8">

          {/* Logo */}
          <Link href="/accueil" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-[#004AAD] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">LDS</span>
            </div>
            <span className="text-white font-bold text-sm tracking-wide hidden sm:block">INFORMATIK</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  pathname === l.href || pathname.startsWith(l.href + '/')
                    ? 'text-white bg-[#004AAD]'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                )}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <a href={`tel:${boutique.tel?.replace(/\s/g,'')}`}
              className="hidden sm:flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors">
              <Phone size={14} />
              {boutique.tel || '07 45 01 41 27'}
            </a>
            <Link href={isLoggedIn ? '/espace-client/tableau-de-bord' : '/espace-client/connexion'}
              className="flex items-center gap-2 bg-[#004AAD] hover:bg-[#052659] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
              <User size={14} />
              <span className="hidden sm:block">{isLoggedIn ? 'Mon espace' : 'Connexion'}</span>
            </Link>
            <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#021634] border-t border-white/5 px-4 py-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={cn('block px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-all',
                pathname === l.href ? 'text-white bg-[#004AAD]' : 'text-white/70 hover:text-white'
              )}>
              {l.label}
            </Link>
          ))}
          <a href={`tel:${boutique.tel?.replace(/\s/g,'')}`}
            className="flex items-center gap-2 px-4 py-3 text-white/60 text-sm mt-2">
            <Phone size={14} /> {boutique.tel || '07 45 01 41 27'}
          </a>
        </div>
      )}
    </header>
  )
}
