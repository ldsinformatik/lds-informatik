'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle, Star, Wrench, ShoppingBag, Building2, Clock } from 'lucide-react'

interface HeroBannerProps { boutique: Record<string, string> }

function BadgeHoraires() {
  const [statut, setStatut] = useState<'ouvert'|'ferme'>('ouvert')

  useEffect(() => {
    const check = () => {
      const now = new Date()
      const day = now.getDay() // 0=dim, 6=sam
      const h = now.getHours() * 60 + now.getMinutes()
      let open = false
      if (day >= 1 && day <= 5) open = (h >= 570 && h <= 780) || (h >= 870 && h <= 1110)
      if (day === 6) open = h >= 570 && h <= 840
      setStatut(open ? 'ouvert' : 'ferme')
    }
    check()
    const t = setInterval(check, 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
      statut === 'ouvert' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
    }`}>
      <span className={`w-2 h-2 rounded-full ${statut === 'ouvert' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
      {statut === 'ouvert' ? 'Ouvert maintenant' : 'Actuellement fermé'}
    </span>
  )
}

export default function HeroBanner({ boutique }: HeroBannerProps) {
  return (
    <section className="bg-[#021634] pt-28 pb-20 relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#004AAD]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Gauche */}
          <div>
            <BadgeHoraires />
            <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Votre expert<br />
              <span className="text-[#004AAD]">informatique</span><br />
              à Troyes
            </h1>
            <p className="mt-5 text-white/60 text-lg leading-relaxed max-w-xl">
              Depuis 2023, LDS INFORMATIK accompagne les particuliers et les professionnels
              pour tous leurs besoins informatiques et téléphonie.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reparer" className="btn-primary">
                Demander un devis <ArrowRight size={16} />
              </Link>
              <Link href="/acheter" className="btn-secondary">
                Voir les produits
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-5">
              {[
                'Diagnostic gratuit',
                'Sans rendez-vous',
                "Garantie jusqu'à 3 ans",
                'Paiement en plusieurs fois',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-white/60 text-sm">
                  <CheckCircle size={14} className="text-[#004AAD]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Droite */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Wrench, label: 'Réparation', desc: 'Smartphones & PC', href: '/reparer', color: 'bg-blue-500/10 text-blue-400' },
              { icon: ShoppingBag, label: 'Acheter', desc: 'Produits reconditionnés', href: '/acheter', color: 'bg-green-500/10 text-green-400' },
              { icon: Building2, label: 'Infogérance', desc: 'Services B2B', href: '/infogerance', color: 'bg-purple-500/10 text-purple-400' },
              { icon: Clock, label: 'Assistance', desc: 'Prise en main à distance', href: '/contact', color: 'bg-amber-500/10 text-amber-400' },
            ].map(s => (
              <Link key={s.label} href={s.href}
                className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 rounded-2xl p-5 transition-all group">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon size={20} />
                </div>
                <div className="text-white font-bold text-sm">{s.label}</div>
                <div className="text-white/40 text-xs mt-0.5">{s.desc}</div>
              </Link>
            ))}

            {/* Note Google */}
            <a href={boutique.google_avis || '#'} target="_blank" rel="noopener"
              className="col-span-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 flex items-center gap-4 transition-all">
              <div className="flex text-yellow-400 gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">5/5 sur Google</div>
                <div className="text-white/40 text-xs">Voir nos avis clients →</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
