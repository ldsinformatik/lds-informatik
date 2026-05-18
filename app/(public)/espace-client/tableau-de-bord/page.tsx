import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, statutLabel, statutColor } from '@/lib/utils'
import { Wrench, ShoppingBag, User, LogOut, Clock } from 'lucide-react'

export default async function TableauDeBordPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/espace-client/connexion')

  const [
    { data: profile },
    { data: demandes },
    { data: reservations },
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', session.user.id).single(),
    supabase.from('demandes').select('*').eq('client_id', session.user.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('reservations').select('*').eq('client_id', session.user.id).order('created_at', { ascending: false }).limit(5),
  ])

  const prenom = profile?.prenom || session.user.email?.split('@')[0] || 'Client'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Bonjour, {prenom} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Bienvenue dans votre espace client</p>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button className="btn-ghost text-sm">
            <LogOut size={14} /> Déconnexion
          </button>
        </form>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Réparations', value: demandes?.length || 0, icon: Wrench, href: '/espace-client/reparations' },
          { label: 'Réservations', value: reservations?.length || 0, icon: ShoppingBag, href: '/espace-client/commandes' },
        ].map(s => (
          <Link key={s.label} href={s.href}
            className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <s.icon size={18} className="text-[#004AAD]" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            </div>
          </Link>
        ))}

        <Link href="/espace-client/profil" className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
              <User size={18} className="text-purple-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Mon profil</div>
              <div className="text-xs text-gray-500">Infos personnelles</div>
            </div>
          </div>
        </Link>

        <Link href="/reparer" className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all bg-[#004AAD] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <Wrench size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold">Nouvelle demande</div>
              <div className="text-xs opacity-70">Réparation</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Dernières réparations */}
      <div className="card mb-6">
        <div className="ch">
          <div className="ct flex items-center gap-2"><Wrench size={16} className="text-[#004AAD]" /> Dernières réparations</div>
          <Link href="/espace-client/reparations" className="text-[#004AAD] text-xs font-semibold hover:underline">Voir tout →</Link>
        </div>
        {!demandes || demandes.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Wrench size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucune demande de réparation</p>
            <Link href="/reparer" className="btn-primary mt-4 text-sm inline-flex">Demander un devis</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {demandes.map(d => (
              <div key={d.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{d.appareil} {d.marque} {d.modele}</p>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                    <Clock size={11} /> {formatDate(d.created_at)} · Réf. {d.ref}
                  </p>
                </div>
                <span className={`badge text-xs ${statutColor(d.statut)}`}>{statutLabel(d.statut)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dernières réservations */}
      <div className="card">
        <div className="ch">
          <div className="ct flex items-center gap-2"><ShoppingBag size={16} className="text-[#004AAD]" /> Dernières réservations</div>
          <Link href="/espace-client/commandes" className="text-[#004AAD] text-xs font-semibold hover:underline">Voir tout →</Link>
        </div>
        {!reservations || reservations.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <ShoppingBag size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucune réservation</p>
            <Link href="/acheter" className="btn-primary mt-4 text-sm inline-flex">Voir les produits</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reservations.map(r => (
              <div key={r.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.produit_nom}</p>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                    <Clock size={11} /> {formatDate(r.created_at)} · {r.produit_prix}€
                  </p>
                </div>
                <span className={`badge text-xs ${statutColor(r.statut)}`}>{statutLabel(r.statut)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
