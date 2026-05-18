import type { Partenaire } from '@/types/database'

interface PartenairesCarouselProps { partenaires: Partenaire[] }

export default function PartenairesCarousel({ partenaires }: PartenairesCarouselProps) {
  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Nos partenaires</p>
      </div>
      <div className="relative flex overflow-hidden">
        {[0, 1].map(copy => (
          <div key={copy}
            className="flex items-center gap-12 animate-[scroll_30s_linear_infinite] flex-shrink-0"
            style={{ animationDelay: copy === 1 ? '-15s' : '0s' }}>
            {partenaires.map(p => (
              <div key={p.id} className="flex-shrink-0 flex items-center justify-center h-10 w-32 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all">
                {p.logo
                  ? <img src={p.logo} alt={p.nom} className="max-h-10 max-w-[120px] object-contain" />
                  : <span className="text-gray-400 font-bold text-sm">{p.nom}</span>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  )
}
