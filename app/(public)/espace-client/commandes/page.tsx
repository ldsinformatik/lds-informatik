import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatPrice, statutLabel, statutColor } from '@/lib/utils'
import { ShoppingBag, ArrowLeft, Clock } from 'lucide-react'

export default async function CommandesClientPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/espace-client/connexion')

  const { data: reservations } = await supabase
    .from('reservations')
    .select('*')
    .eq('client_id', session.user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/espace-client/tableau-de-bord" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <ShoppingBag size={22} className="text-[#004AAD]" /> Mes réservations
          </h1>
          <p className="text-gray-500 text-sm">{reservations?.length || 0} réservation(s)</p>
        </div>
      </div>

      {!reservations || reservations.length === 0 ? (
        <div className="card p-16 text-center">
          <ShoppingBag size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucune réservation</p>
          <Link href="/acheter" className="btn-primary">Voir les produits</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map(r => (
            <div key={r.id} className="card p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  📱
                </div>
                <div>
                  <div className="font-bold text-gray-900">{r.produit_nom}</div>
                  <div className="text-[#004AAD] font-bold text-sm">{formatPrice(r.produit_prix)}</div>
                  <div className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                    <Clock size={11} /> {formatDate(r.created_at)} · Réf. <span className="font-mono">{r.ref}</span>
                  </div>
                </div>
              </div>
              <span className={`badge ${statutColor(r.statut)} flex-shrink-0`}>{statutLabel(r.statut)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 card p-5 bg-blue-50 border-blue-100">
        <p className="text-sm text-blue-800">
          <strong>Rappel :</strong> Le paiement s'effectue directement en boutique lors du retrait.
          Nous vous contacterons pour confirmer la disponibilité et convenir d'un horaire.
        </p>
      </div>
    </div>
  )
}
