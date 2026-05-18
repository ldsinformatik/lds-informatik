import { createClient } from '@/lib/supabase-server'
import FormulaireReparation from '@/components/forms/FormulaireReparation'
import type { Metadata } from 'next'
import { Wrench, CheckCircle, Clock, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Réparation Smartphone & PC — LDS INFORMATIK Troyes',
  description: 'Réparation iPhone, Samsung, MacBook, PC portable à Troyes. Diagnostic gratuit, devis immédiat, intervention le jour même.',
  alternates: { canonical: '/reparer' },
}

export default async function ReparerPage() {
  const supabase = createClient()
  const { data: tarifs } = await supabase
    .from('tarifs')
    .select('*')
    .eq('visible', true)
    .order('ordre')

  const { data: { session } } = await supabase.auth.getSession()

  return (
    <>
      {/* Hero */}
      <section className="bg-[#021634] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold bg-blue-500/10 px-4 py-1.5 rounded-full mb-5">
              <Wrench size={14} /> Réparation
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
              Réparation rapide<br />& garantie
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Diagnostic gratuit sans engagement. Devis immédiat. La plupart des réparations sont effectuées le jour même.
            </p>
            <div className="flex flex-wrap gap-5">
              {[
                {icon: CheckCircle, label: 'Diagnostic gratuit'},
                {icon: Clock, label: 'Réparation le jour même'},
                {icon: Shield, label: "Garantie jusqu'à 3 ans"},
              ].map(i => (
                <div key={i.label} className="flex items-center gap-2 text-white/60 text-sm">
                  <i.icon size={14} className="text-[#004AAD]" /> {i.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      {tarifs && tarifs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="section-tag">Nos tarifs</span>
              <h2 className="section-title">Prix clairs, sans surprise</h2>
              <p className="text-gray-500 mt-3">Tous les prix incluent la main d'œuvre et les pièces.</p>
            </div>

            {/* Smartphone */}
            {tarifs.filter(t => t.categorie === 'smartphone').length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">📱 Smartphone</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tarifs.filter(t => t.categorie === 'smartphone').map(t => (
                    <div key={t.id} className="card p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{t.ico}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm">{t.nom}</div>
                          <div className="text-gray-400 text-xs mt-0.5">{t.description}</div>
                          <div className="mt-2 font-bold text-[#004AAD]">
                            {t.prix_min === 0 ? 'Gratuit' : `À partir de ${t.prix_min}€`}
                            {t.prix_max > 0 && t.prix_max !== t.prix_min && ` – ${t.prix_max}€`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PC */}
            {tarifs.filter(t => t.categorie === 'pc').length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">💻 PC Portable & Mac</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tarifs.filter(t => t.categorie === 'pc').map(t => (
                    <div key={t.id} className="card p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{t.ico}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm">{t.nom}</div>
                          <div className="text-gray-400 text-xs mt-0.5">{t.description}</div>
                          <div className="mt-2 font-bold text-[#004AAD]">
                            {t.prix_min === 0 ? 'Gratuit' : `À partir de ${t.prix_min}€`}
                            {t.prix_max > 0 && t.prix_max !== t.prix_min && ` – ${t.prix_max}€`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Formulaire */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="section-tag">Demande de devis</span>
            <h2 className="section-title">Décrivez votre panne</h2>
            <p className="text-gray-500 mt-3">Nous vous contacterons dans les 2h pour confirmer le devis.</p>
          </div>
          <FormulaireReparation clientId={session?.user?.id} clientEmail={session?.user?.email} />
        </div>
      </section>
    </>
  )
}
