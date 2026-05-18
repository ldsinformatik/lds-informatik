'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ShoppingBag, X, Check, Package } from 'lucide-react'
import type { Produit } from '@/types/database'
import { formatPrice } from '@/lib/utils'

const schema = z.object({
  client_nom: z.string().min(2, 'Nom requis'),
  client_email: z.string().email('Email invalide'),
  client_tel: z.string().min(8, 'Téléphone requis'),
  message: z.string().optional(),
})
type FormData = z.infer<typeof schema>

interface Props {
  produits: Produit[]
  isLoggedIn: boolean
  clientEmail?: string
  clientId?: string
}

const cats = [
  { value: '', label: 'Tous' },
  { value: 'smartphone', label: '📱 Smartphones' },
  { value: 'pc', label: '💻 PC Portables' },
  { value: 'tablette', label: '📟 Tablettes' },
  { value: 'accessoire', label: '🔧 Accessoires' },
]

export default function CatalogueProduits({ produits, isLoggedIn, clientEmail, clientId }: Props) {
  const [cat, setCat] = useState('')
  const [selectedProduit, setSelectedProduit] = useState<Produit | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [reservationRef, setReservationRef] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { client_email: clientEmail || '' },
  })

  const filtered = cat ? produits.filter(p => p.categorie === cat) : produits

  const openModal = (p: Produit) => {
    setSelectedProduit(p)
    setDone(false)
    reset({ client_email: clientEmail || '' })
  }

  const onSubmit = async (data: FormData) => {
    if (!selectedProduit) return
    setLoading(true)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          produit_id: selectedProduit.id,
          produit_nom: selectedProduit.nom,
          produit_prix: selectedProduit.prix,
          client_id: clientId,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setReservationRef(json.ref)
      setDone(true)
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors de la réservation')
    } finally {
      setLoading(false)
    }
  }

  const etatColor: Record<string, string> = {
    'Neuf': 'bg-blue-100 text-blue-700',
    'Très bon état': 'bg-green-100 text-green-700',
    'Bon état': 'bg-amber-100 text-amber-700',
    'État correct': 'bg-gray-100 text-gray-600',
  }

  return (
    <>
      {/* Filtres */}
      <div className="flex gap-2 flex-wrap mb-8 justify-center">
        {cats.map(c => (
          <button key={c.value} onClick={() => setCat(c.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${cat === c.value ? 'bg-[#004AAD] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun produit dans cette catégorie pour le moment.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                {p.images?.[0]
                  ? <img src={p.images[0]} alt={p.nom} className="h-40 object-contain" />
                  : <span className="text-7xl">{p.categorie === 'smartphone' ? '📱' : p.categorie === 'pc' ? '💻' : '📟'}</span>
                }
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{p.marque}</p>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{p.nom}</h3>
                  </div>
                  <span className={`badge text-xs flex-shrink-0 ${etatColor[p.etat] || 'bg-gray-100 text-gray-600'}`}>{p.etat}</span>
                </div>
                {p.specs && p.specs.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.specs.map((s, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                )}
                {p.description && <p className="text-gray-500 text-xs mb-4">{p.description}</p>}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-[#004AAD]">{formatPrice(p.prix)}</span>
                  <button onClick={() => openModal(p)}
                    className="btn-primary py-2 px-4 text-sm">
                    <ShoppingBag size={14} /> Réserver
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Stock : {p.stock} disponible{p.stock > 1 ? 's' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal réservation */}
      {selectedProduit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) setSelectedProduit(null) }}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <h3 className="font-bold text-gray-900">Réserver ce produit</h3>
              <button onClick={() => setSelectedProduit(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              {/* Produit recap */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-3xl">{selectedProduit.categorie === 'smartphone' ? '📱' : '💻'}</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{selectedProduit.nom}</p>
                  <p className="text-[#004AAD] font-bold">{formatPrice(selectedProduit.prix)}</p>
                </div>
              </div>

              {done ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Réservation confirmée !</h4>
                  <p className="text-gray-500 text-sm mb-2">Réf : <strong className="text-[#004AAD]">{reservationRef}</strong></p>
                  <p className="text-gray-500 text-sm">Nous vous contacterons dans les 2h pour confirmer le retrait en boutique.</p>
                  <button onClick={() => setSelectedProduit(null)} className="btn-primary mt-6 justify-center">
                    Fermer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nom complet *</label>
                      <input {...register('client_nom')} className="input" placeholder="Marie Dupont" />
                      {errors.client_nom && <p className="text-red-500 text-xs mt-1">{errors.client_nom.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
                      <input {...register('client_email')} type="email" className="input" />
                      {errors.client_email && <p className="text-red-500 text-xs mt-1">{errors.client_email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Téléphone *</label>
                      <input {...register('client_tel')} type="tel" className="input" placeholder="07 00 00 00 00" />
                      {errors.client_tel && <p className="text-red-500 text-xs mt-1">{errors.client_tel.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Message (optionnel)</label>
                      <textarea {...register('message')} className="input" rows={2} placeholder="Question ou précision..." />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">Aucun paiement en ligne. Vous réglez directement en boutique lors du retrait.</p>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? 'Envoi en cours...' : <><ShoppingBag size={16} /> Confirmer la réservation</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
