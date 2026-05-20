import { createClient } from '@/lib/supabase-server'
import CatalogueProduits from '@/components/shop/CatalogueProduits'
import type { Metadata } from 'next'
import {
  ShoppingBag,
  Shield,
  RefreshCw,
  Star,
  Smartphone,
  Laptop,
  BadgeCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Acheter — Produits reconditionnés — LDS INFORMATIK Troyes',
  description:
    'Smartphones et PC portables reconditionnés à Troyes. iPhone, Samsung, MacBook avec garantie.',
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

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      {/* HERO */}
      <section className="bg-[#021634] pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[#d8e9ff] text-sm font-semibold bg-[#004AAD]/20 px-4 py-2 rounded-full mb-6 border border-[#004AAD]/30">
              <ShoppingBag size={15} />
              Achat & Vente
            </span>

            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
              Produits
              <br />
              reconditionnés
            </h1>

            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-10">
              Smartphones, PC portables et appareils testés avec soin.
              Réservez en ligne et récupérez votre appareil directement en
              boutique à Troyes.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#catalogue"
                className="bg-[#004AAD] hover:bg-[#003b8a] transition px-6 py-3 rounded-2xl text-white font-semibold"
              >
                Voir le catalogue
              </a>

              <a
                href="/contact"
                className="border border-white/20 hover:border-white/40 transition px-6 py-3 rounded-2xl text-white font-semibold"
              >
                Une question ?
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: Shield, label: 'Garantie incluse' },
                { icon: RefreshCw, label: 'Testés & reconditionnés' },
                { icon: Star, label: 'Qualité certifiée' },
              ].map((i) => (
                <div
                  key={i.label}
                  className="flex items-center gap-2 text-white/70 text-sm"
                >
                  <i.icon size={15} className="text-[#d8e9ff]" />
                  {i.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 bg-[#f8fbff] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: Smartphone,
                title: 'Smartphones',
                desc: 'iPhone, Samsung et autres modèles reconditionnés.',
              },
              {
                icon: Laptop,
                title: 'PC Portables',
                desc: 'PC Windows et MacBook prêts à l’emploi.',
              },
              {
                icon: BadgeCheck,
                title: 'Appareils vérifiés',
                desc: 'Contrôlés, nettoyés et testés avant mise en vente.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl border border-gray-100 p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#004AAD]/10 flex items-center justify-center mb-5">
                  <item.icon className="text-[#004AAD]" size={22} />
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Simple & rapide</span>

            <h2 className="section-title mt-3">
              Comment ça fonctionne ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: '01',
                t: 'Vous réservez',
                d: 'Choisissez votre appareil directement sur le site.',
              },
              {
                n: '02',
                t: 'On vous contacte',
                d: 'Nous confirmons rapidement la disponibilité du produit.',
              },
              {
                n: '03',
                t: 'Retrait en boutique',
                d: 'Récupérez votre appareil directement chez LDS INFORMATIK.',
              },
            ].map((s) => (
              <div
                key={s.n}
                className="bg-[#f8fbff] rounded-3xl p-8 border border-gray-100"
              >
                <div className="text-[#004AAD] font-black text-3xl mb-5">
                  {s.n}
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  {s.t}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="catalogue" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Catalogue</span>

            <h2 className="section-title mt-3">
              Appareils disponibles
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Tous nos appareils sont testés et préparés avant la mise en
              vente.
            </p>
          </div>

          <CatalogueProduits
            produits={produits || []}
            isLoggedIn={!!session}
            clientEmail={session?.user?.email}
            clientId={session?.user?.id}
          />
        </div>
      </section>
    </>
  )
}
