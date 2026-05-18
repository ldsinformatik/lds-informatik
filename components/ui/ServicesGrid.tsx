import Link from 'next/link'
import { Wrench, ShoppingBag, Building2, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Wrench,
    label: 'Réparation',
    tag: 'Smartphones & PC',
    desc: 'Écran, batterie, clavier, connecteur… Diagnostic gratuit, devis immédiat, réparation le jour même dans la plupart des cas.',
    href: '/reparer',
    color: 'text-blue-600 bg-blue-50',
    features: ['iPhone & Samsung', 'MacBook & PC Windows', 'Tablettes'],
  },
  {
    icon: ShoppingBag,
    label: 'Produits reconditionnés',
    tag: 'Achat & Vente',
    desc: 'Smartphones, PC portables et accessoires reconditionnés avec garantie. Qualité testée, prix honnêtes.',
    href: '/acheter',
    color: 'text-green-600 bg-green-50',
    features: ['iPhone reconditionnés', 'MacBook & PC portables', 'Accessoires'],
  },
  {
    icon: Building2,
    label: 'Infogérance B2B',
    tag: 'Entreprises',
    desc: 'Gestion et maintenance de votre parc informatique, assistance utilisateurs, cybersécurité et solutions cloud.',
    href: '/infogerance',
    color: 'text-purple-600 bg-purple-50',
    features: ['Maintenance parc IT', 'Assistance & support', 'Sauvegarde & sécurité'],
  },
]

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="section-tag">Nos services</span>
          <h2 className="section-title">Une offre complète<br />pour particuliers & professionnels</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map(s => (
            <Link key={s.label} href={s.href}
              className="card p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center mb-5`}>
                <s.icon size={22} />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.tag}</span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 mb-3">{s.label}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-2 mb-6">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#004AAD]" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-[#004AAD] text-sm font-semibold group-hover:gap-3 transition-all">
                En savoir plus <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
