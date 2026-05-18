import { createClient } from '@/lib/supabase-server'
import FormulaireInfogerance from '@/components/forms/FormulaireInfogerance'
import type { Metadata } from 'next'
import { Building2, Clock, Shield, Server, Monitor, Cloud, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Infogérance & Services B2B — LDS INFORMATIK Troyes',
  description: 'Gestion de parc informatique, assistance utilisateurs, cybersécurité et solutions cloud pour TPE et PME à Troyes.',
  alternates: { canonical: '/infogerance' },
}

const forfaits = [
  {
    nom: 'Starter', prix: 79, postes: "Jusqu'à 5 postes",
    desc: 'Idéal pour les TPE',
    includes: ['Maintenance préventive mensuelle', 'Assistance téléphonique 6j/7', 'Antivirus managé', 'Sauvegarde cloud 50Go'],
    featured: false,
  },
  {
    nom: 'Business', prix: 149, postes: "Jusqu'à 15 postes",
    desc: 'Pour les PME en croissance',
    includes: ['Tout du Starter', 'Supervision 24h/7j', 'Microsoft 365 inclus', 'Sauvegarde cloud 500Go', 'Intervention sous 4h'],
    featured: true,
  },
  {
    nom: 'Enterprise', prix: 299, postes: 'Postes illimités',
    desc: 'Solution complète',
    includes: ['Tout du Business', 'DSI externalisé dédié', 'Cybersécurité avancée', 'SLA garanti', 'Formation équipes'],
    featured: false,
  },
]

const services = [
  { icon: Monitor, title: 'Gestion & Maintenance parc', desc: 'Suivi, mises à jour et maintenance préventive de tous vos équipements.' },
  { icon: HelpCircle, title: 'Assistance & Support', desc: 'Support téléphonique et télémaintenance pour vos collaborateurs.' },
  { icon: Cloud, title: 'Google Workspace & Microsoft 365', desc: 'Déploiement, migration et administration de vos solutions cloud.' },
  { icon: Shield, title: 'Sauvegarde & Sécurité', desc: 'Données sauvegardées en Europe, antivirus managé, protection ransomware.' },
  { icon: Server, title: 'Hébergement & Cloud', desc: 'Solutions d\'hébergement adaptées, données stockées en Europe.' },
]

export default async function InfogerancePage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <>
      {/* Hero */}
      <section className="bg-[#021634] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-purple-400 text-sm font-semibold bg-purple-500/10 px-4 py-1.5 rounded-full mb-5">
              <Building2 size={14} /> Infogérance B2B
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
              Votre DSI<br />externalisé
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              TPE · PME · Associations — Concentrez-vous sur votre cœur de métier.
              On gère votre informatique de A à Z.
            </p>
            <div className="flex flex-wrap gap-5">
              {[
                { icon: Clock, label: '~ 2h délai intervention' },
                { icon: Shield, label: 'Données hébergées en Europe' },
              ].map(i => (
                <div key={i.label} className="flex items-center gap-2 text-white/60 text-sm">
                  <i.icon size={14} className="text-purple-400" /> {i.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Nos prestations</span>
            <h2 className="section-title">Ce que nous vous proposons</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(s => (
              <div key={s.title} className="card p-6">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                  <s.icon size={20} className="text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forfaits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Forfaits</span>
            <h2 className="section-title">Tarifs transparents</h2>
            <p className="text-gray-500 mt-3">Sans engagement minimum. Évoluez à votre rythme.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {forfaits.map(f => (
              <div key={f.nom} className={`card relative overflow-visible ${f.featured ? 'ring-2 ring-[#004AAD]' : ''}`}>
                {f.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#004AAD] text-white text-xs font-bold px-4 py-1 rounded-full">
                    ⭐ Populaire
                  </div>
                )}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-black text-[#004AAD]">{f.nom}</h3>
                  <p className="text-gray-400 text-sm mt-1">{f.desc}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-gray-900">{f.prix}€</span>
                    <span className="text-gray-400 text-sm">/mois HT</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{f.postes}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {f.includes.map(inc => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="section-tag">Contact</span>
            <h2 className="section-title">Échangeons sur vos besoins</h2>
            <p className="text-gray-500 mt-3">Devis personnalisé sous 24h.</p>
          </div>
          <FormulaireInfogerance clientId={session?.user?.id} clientEmail={session?.user?.email} />
        </div>
      </section>
    </>
  )
}
