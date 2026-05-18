import { supabaseAdmin } from '@/lib/supabase'
import { formatDate, formatPrice, statutLabel, statutColor } from '@/lib/utils'

export default async function AdminReservationsPage() {
  const db = supabaseAdmin()
  const { data: reservations } = await db.from('reservations').select('*').order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">🛍 Réservations produits</h1>
        <p className="text-gray-500 text-sm mt-1">{reservations?.length || 0} réservation(s)</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Réf.', 'Client', 'Produit', 'Prix', 'Date', 'Statut'].map(h => (
                <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!reservations || reservations.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">Aucune réservation</td></tr>
            ) : reservations.map(r => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3"><code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{r.ref}</code></td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-sm">{r.client_nom}</div>
                  <div className="text-xs text-gray-400">{r.client_email} · {r.client_tel}</div>
                </td>
                <td className="px-4 py-3 text-sm">{r.produit_nom}</td>
                <td className="px-4 py-3 text-sm font-bold text-[#004AAD]">{formatPrice(r.produit_prix)}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{formatDate(r.created_at)}</td>
                <td className="px-4 py-3"><span className={`badge text-xs ${statutColor(r.statut)}`}>{statutLabel(r.statut)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
