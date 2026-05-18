import { createClient } from '@/lib/supabase-server'
import FormulaireContact from '@/components/forms/FormulaireContact'
import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, Monitor } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — LDS INFORMATIK Troyes',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const supabase = createClient()
  const { data: configRow } = await supabase.from('config').select('valeur').eq('cle', 'boutique').single()
  const { data: horairesRow } = await supabase.from('config').select('valeur').eq('cle', 'horaires').single()
  const boutique = (configRow?.valeur as Record<string, string>) || {}
  const horaires = (horairesRow?.valeur as Array<{jour: string; ouvert: boolean; matin: string; aprem: string}>) || []
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <>
      <section className="bg-[#021634] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Contact</h1>
            <p className="text-white/60 text-lg">Passez directement en boutique ou envoyez-nous un message.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Infos */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="font-bold text-gray-900 mb-5 text-lg">Nous trouver</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-[#004AAD] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{boutique.adresse || '145 Avenue Pierre Brossolette'}</p>
                      <p className="text-gray-500 text-sm">{boutique.cp || '10000'} {boutique.ville || 'Troyes'}</p>
                      <a href={boutique.maps_link || 'https://maps.google.com/?q=LDS+Informatik+Troyes'}
                        target="_blank" rel="noopener"
                        className="text-[#004AAD] text-xs font-medium hover:underline mt-1 block">
                        Ouvrir dans Google Maps →
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone size={18} className="text-[#004AAD] flex-shrink-0" />
                    <a href={`tel:${(boutique.tel || '').replace(/\s/g,'')}`} className="text-gray-900 font-semibold hover:text-[#004AAD] text-sm">
                      {boutique.tel || '07 45 01 41 27'}
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <Mail size={18} className="text-[#004AAD] flex-shrink-0" />
                    <a href={`mailto:${boutique.email}`} className="text-gray-900 font-semibold hover:text-[#004AAD] text-sm">
                      {boutique.email || 'contact@ldsinformatik.fr'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="card p-6">
                <h2 className="font-bold text-gray-900 mb-5 text-lg flex items-center gap-2">
                  <Clock size={18} className="text-[#004AAD]" /> Horaires d'ouverture
                </h2>
                <div className="space-y-2">
                  {horaires.length > 0 ? horaires.map(h => (
                    <div key={h.jour} className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${h.ouvert ? 'text-gray-900' : 'text-gray-400'}`}>{h.jour}</span>
                      <span className={h.ouvert ? 'text-gray-600' : 'text-gray-300'}>
                        {h.ouvert ? `${h.matin}${h.aprem ? ' / ' + h.aprem : ''}` : 'Fermé'}
                      </span>
                    </div>
                  )) : (
                    <>
                      <div className="flex justify-between text-sm"><span className="font-medium">Lun – Ven</span><span>9h30 – 13h / 14h30 – 18h30</span></div>
                      <div className="flex justify-between text-sm"><span className="font-medium">Samedi</span><span>9h30 – 14h</span></div>
                      <div className="flex justify-between text-sm"><span className="font-medium text-gray-400">Dimanche</span><span className="text-gray-300">Fermé</span></div>
                    </>
                  )}
                </div>
              </div>

              {/* TeamViewer */}
              <div className="card p-6 bg-blue-50 border-blue-100">
                <div className="flex items-start gap-3">
                  <Monitor size={20} className="text-[#004AAD] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Assistance à distance</h3>
                    <p className="text-gray-600 text-xs mb-3">Nous pouvons intervenir directement sur votre ordinateur avec votre accord.</p>
                    <a href={boutique.teamviewer || 'https://teamviewer.com'} target="_blank" rel="noopener"
                      className="text-[#004AAD] text-xs font-bold hover:underline">
                      Télécharger TeamViewer →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div>
              <h2 className="font-bold text-gray-900 mb-6 text-lg">Envoyer un message</h2>
              <FormulaireContact clientEmail={session?.user?.email} clientId={session?.user?.id} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
