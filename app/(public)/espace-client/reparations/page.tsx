import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, statutLabel, statutColor } from '@/lib/utils'
import { Wrench, ArrowLeft, Clock } from 'lucide-react'

export default async function ReparationsClientPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/espace-client/connexion')

  const { data: demandes } = await supabase
    .from('demandes')
    .select('*')
    .eq('client_id', session.user.id)
    .in('type', ['reparation', 'pc_sur_mesure'])
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/espace-client/tableau-de-bord" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Wrench size={22} className="text-[#004AAD]" /> Mes réparations
          </h1>
          <p className="text-gray-500 text-sm">{demandes?.length || 0} demande(s)</p>
        </div>
      </div>

      {!demandes || demandes.length === 0 ? (
        <div className="card p-16 text-center">
          <Wrench size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucune demande de réparation</p>
          <Link href="/reparer" className="btn-primary">Demander un devis</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {demandes.map(d => (
            <div key={d.id} className="card p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-bold text-gray-900">{d.appareil} {d.marque} {d.modele || ''}</div>
                  <div className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                    <Clock size={11} /> {formatDate(d.created_at)} · Réf. <span className="font-mono">{d.ref}</span>
                  </div>
                </div>
                <span className={`badge ${statutColor(d.statut)}`}>{statutLabel(d.statut)}</span>
              </div>
              {d.prestations && d.prestations.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {d.prestations.map((p: string) => (
                    <span key={p} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{p}</span>
                  ))}
                </div>
              )}
              {/* Timeline */}
              {d.timeline && Array.isArray(d.timeline) && d.timeline.length > 0 && (
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Suivi</p>
                  <div className="space-y-2">
                    {(d.timeline as Array<{date: string; statut: string; message: string}>).map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#004AAD] flex-shrink-0 mt-1" />
                        <div>
                          <span className="text-gray-500">{formatDate(t.date)}</span>
                          <span className="text-gray-700 ml-2">{t.message || statutLabel(t.statut)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
