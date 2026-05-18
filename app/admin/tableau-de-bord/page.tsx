import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { formatDate, statutLabel, statutColor } from '@/lib/utils'

export default async function AdminDashboardPage() {
  const db = supabaseAdmin()
  const [
    { count: totalDemandes },
    { count: nouvelles },
    { count: enCours },
    { count: totalProduits },
    { count: totalClients },
    { data: recentDemandes },
    { data: recentReservations },
  ] = await Promise.all([
    db.from('demandes').select('*', { count: 'exact', head: true }),
    db.from('demandes').select('*', { count: 'exact', head: true }).eq('statut', 'nouveau'),
    db.from('demandes').select('*', { count: 'exact', head: true }).eq('statut', 'en_cours'),
    db.from('produits').select('*', { count: 'exact', head: true }),
    db.from('profiles').select('*', { count: 'exact', head: true }),
    db.from('demandes').select('*').order('created_at', { ascending: false }).limit(6),
    db.from('reservations').select('*').order('created_at', { ascending: false }).limit(4),
  ])

  const stats = [
    { label: 'Nouvelles demandes', value: nouvelles || 0, color: 'after:bg-red-500', icon: '📥', href: '/admin/demandes?statut=nouveau' },
    { label: 'En cours', value: enCours || 0, color: 'after:bg-green-500', icon: '🔧', href: '/admin/demandes?statut=en_cours' },
    { label: 'Total demandes', value: totalDemandes || 0, color: 'after:bg-[#004AAD]', icon: '📊', href: '/admin/demandes' },
    { label: 'Produits en ligne', value: totalProduits || 0, color: 'after:bg-purple-500', icon: '📦', href: '/admin/produits' },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 text-sm mt-1">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <Link key={s.label} href={s.href}
            className={`bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden hover:shadow-md transition-all after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[3px] ${s.color}`}>
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="text-3xl font-extrabold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Dernières demandes */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">📥 Dernières demandes</h2>
            <Link href="/admin/demandes" className="text-[#004AAD] text-xs font-semibold">Voir tout →</Link>
          </div>
          {recentDemandes && recentDemandes.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {recentDemandes.map(d => (
                <div key={d.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{d.client_nom}</p>
                    <p className="text-xs text-gray-400">{d.ref} · {formatDate(d.created_at)}</p>
                  </div>
                  <span className={`badge text-xs ${statutColor(d.statut)}`}>{statutLabel(d.statut)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400 text-sm">Aucune demande</div>
          )}
        </div>

        {/* Dernières réservations */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">🛍 Dernières réservations</h2>
            <Link href="/admin/reservations" className="text-[#004AAD] text-xs font-semibold">Voir tout →</Link>
          </div>
          {recentReservations && recentReservations.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {recentReservations.map(r => (
                <div key={r.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{r.produit_nom}</p>
                    <p className="text-xs text-gray-400">{r.client_nom} · {r.produit_prix}€</p>
                  </div>
                  <span className={`badge text-xs ${statutColor(r.statut)}`}>{statutLabel(r.statut)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400 text-sm">Aucune réservation</div>
          )}
        </div>
      </div>

      {/* Accès rapides */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="font-bold text-gray-900 mb-4">⚡ Accès rapides</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/admin/produits', label: '+ Ajouter un produit', ico: '📦' },
            { href: '/admin/tarifs', label: 'Modifier les tarifs', ico: '💰' },
            { href: '/admin/avis', label: 'Gérer les avis', ico: '⭐' },
            { href: '/admin/config', label: 'Config boutique', ico: '⚙️' },
          ].map(a => (
            <Link key={a.href} href={a.href}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:border-[#004AAD] hover:text-[#004AAD] text-sm font-medium transition-all text-gray-600">
              <span>{a.ico}</span> {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
