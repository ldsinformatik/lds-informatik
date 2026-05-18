import { createClient } from '@/lib/supabase-server'
import CatalogueProduits from '@/components/shop/CatalogueProduits'
import type { Metadata } from 'next'
import { ShoppingBag, Shield, RefreshCw, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Acheter — Produits reconditionnés — LDS INFORMATIK Troyes',
  description: 'Smartphones et PC portables reconditionnés à Troyes. iPhone, Samsung, MacBook avec garantie. Prix honnêtes, qualité testée.',
  alternates: { canonical: '/acheter' },
}

export default async function AcheterPage() {
  const supabase = createClient()
  const { data: produits } = await supabase
    .from('produits')
    .select('*')
    .eq('visible', true)
    .gt('stock', 0)
    .order('ordre')

  const { data: { session } } = await supabase.auth.getSession()

  return (
    <>
      {/* Hero */}
      <section className="bg-[#021634] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-green-400 text-sm font-semibold bg-green-500/10 px-4 py-1.5 rounded-full mb-5">
              <ShoppingBag size={14} /> Achat & Vente
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
              Produits<br />reconditionnés
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Chaque appareil est testé, nettoyé et garanti. Vous réservez en ligne, vous récupérez en boutique.
            </p>
            <div className="flex flex-wrap gap-5">
              {[
                { icon: Shield, label: 'Garantie incluse' },
                { icon: RefreshCw, label: 'Testés & reconditionnés' },
                { icon: Star, label: 'Qualité certifiée' },
              ].map(i => (
                <div key={i.label} className="flex items-center gap-2 text-white/60 text-sm">
                  <i.icon size={14} className="text-green-400" /> {i.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { n: '1', t: 'Vous réservez en ligne', d: 'Choisissez votre appareil et remplissez vos coordonnées. Gratuit, sans engagement.' },
              { n: '2', t: 'On vous confirme', d: 'Nous vous contactons sous 2h pour confirmer la disponibilité.' },
              { n: '3', t: 'Vous venez en boutique', d: 'Récupérez et réglez directement en magasin. CB, espèces ou plusieurs fois.' },
            ].map(s => (
              <div key={s.n} className="flex gap-4 items-start text-left sm:flex-col sm:items-center sm:text-center">
                <div className="w-10 h-10 rounded-xl bg-[#004AAD] text-white font-black text-lg flex items-center justify-center flex-shrink-0">{s.n}</div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{s.t}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Catalogue</span>
            <h2 className="section-title">Appareils disponibles</h2>
          </div>
          <CatalogueProduits produits={produits || []} isLoggedIn={!!session} clientEmail={session?.user?.email} clientId={session?.user?.id} />
        </div>
      </section>
    </>
  )
}
