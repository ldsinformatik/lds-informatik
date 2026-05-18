import { Star, ExternalLink } from 'lucide-react'
import type { Avis } from '@/types/database'

interface AvisSectionProps { avis: Avis[] }

export default function AvisSection({ avis }: AvisSectionProps) {
  // Afficher max 6 avis aléatoires (côté serveur, on prend les 6 premiers triés)
  const displayed = avis.slice(0, 6)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="section-tag">Avis clients</span>
          <h2 className="section-title">Ce que disent<br />nos clients</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex text-yellow-400">{[1,2,3,4,5].map(i=><Star key={i} size={18} fill="currentColor"/>)}</div>
            <span className="font-bold text-gray-900">5/5</span>
            <span className="text-gray-400 text-sm">sur Google</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map(a => (
            <div key={a.id} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#004AAD] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {a.nom.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{a.nom}</div>
                  <div className="text-gray-400 text-xs">{a.date_texte}</div>
                </div>
                <div className="ml-auto flex text-yellow-400">
                  {Array.from({length: a.note}).map((_,i) => <Star key={i} size={12} fill="currentColor"/>)}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{a.contenu}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="https://share.google/DMnd40szJ82iOlb9I" target="_blank" rel="noopener"
            className="btn-ghost">
            Voir tous les avis Google <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
