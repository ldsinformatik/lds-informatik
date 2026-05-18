'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { section: 'Vue d\'ensemble', items: [
    { href: '/admin/tableau-de-bord', label: 'Tableau de bord', ico: '📊' },
  ]},
  { section: 'Demandes', items: [
    { href: '/admin/demandes', label: 'Demandes', ico: '📥' },
    { href: '/admin/reservations', label: 'Réservations', ico: '🛍' },
  ]},
  { section: 'Contenu', items: [
    { href: '/admin/produits', label: 'Produits', ico: '📦' },
    { href: '/admin/tarifs', label: 'Tarifs', ico: '💰' },
    { href: '/admin/avis', label: 'Avis clients', ico: '⭐' },
    { href: '/admin/faq', label: 'FAQ', ico: '❓' },
    { href: '/admin/partenaires', label: 'Partenaires', ico: '🤝' },
  ]},
  { section: 'Clients', items: [
    { href: '/admin/clients', label: 'Clients', ico: '👥' },
  ]},
  { section: 'Configuration', items: [
    { href: '/admin/config', label: 'Boutique & Config', ico: '⚙️' },
  ]},
]

export default function AdminSidebar() {
  const path = usePathname()
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#021634] flex flex-col z-50 overflow-y-auto">
      <div className="px-4 py-5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#004AAD] rounded-lg flex items-center justify-center text-xs font-black text-white">LDS</div>
          <div>
            <div className="text-white text-xs font-bold">INFORMATIK</div>
            <div className="text-white/40 text-[10px]">Administration</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-3">
        {links.map(section => (
          <div key={section.section}>
            <p className="px-4 pt-4 pb-1.5 text-[9px] font-bold text-white/30 uppercase tracking-widest">{section.section}</p>
            {section.items.map(item => (
              <Link key={item.href} href={item.href}
                className={cn('flex items-center gap-2.5 mx-2 px-3 py-2 rounded-lg text-[12.5px] font-medium transition-all mb-0.5',
                  path === item.href || path.startsWith(item.href + '/')
                    ? 'bg-[#004AAD] text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/6'
                )}>
                <span className="text-sm w-4 text-center">{item.ico}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/8">
        <Link href="/accueil" target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/50 hover:text-white text-xs transition-all">
          🌐 Voir le site
        </Link>
      </div>
    </aside>
  )
}
