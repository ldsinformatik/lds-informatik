'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Plus, X, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import type { Produit } from '@/types/database'
import { formatPrice } from '@/lib/utils'

export default function AdminProduitsClient({ produits: initial }: { produits: Produit[] }) {
  const [produits, setProduits] = useState(initial)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Produit | null>(null)
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset, setValue } = useForm()

  const openNew = () => { setEditing(null); reset({ visible: true, stock: 1 }); setModal(true) }
  const openEdit = (p: Produit) => {
    setEditing(p)
    reset({ ...p, specs: p.specs?.join('\n') || '' })
    setModal(true)
  }

  const onSubmit = async (data: any) => {
    setSaving(true)
    try {
      const payload = { ...data, prix: +data.prix, stock: +data.stock, specs: data.specs ? data.specs.split('\n').filter(Boolean) : [] }
      const url = editing ? `/api/admin/produits/${editing.id}` : '/api/admin/produits'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      if (editing) {
        setProduits(prev => prev.map(p => p.id === editing.id ? { ...p, ...payload } : p))
        toast.success('Produit modifié ✅')
      } else {
        setProduits(prev => [json.data, ...prev])
        toast.success('Produit ajouté ✅')
      }
      setModal(false)
    } catch (e: any) { toast.error(e.message) }
    setSaving(false)
  }

  const toggleVisible = async (p: Produit) => {
    await fetch(`/api/admin/produits/${p.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visible: !p.visible }) })
    setProduits(prev => prev.map(x => x.id === p.id ? { ...x, visible: !x.visible } : x))
  }

  const deleteProduit = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return
    await fetch(`/api/admin/produits/${id}`, { method: 'DELETE' })
    setProduits(prev => prev.filter(p => p.id !== id))
    toast.success('Supprimé')
  }

  return (
    <>
      <div className="flex justify-end mb-5">
        <button onClick={openNew} className="btn-primary"><Plus size={16} /> Nouveau produit</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {produits.map(p => (
          <div key={p.id} className={`bg-white rounded-2xl border overflow-hidden ${p.visible ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <div className="h-36 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-5xl">
              {p.categorie === 'smartphone' ? '📱' : p.categorie === 'pc' ? '💻' : '📟'}
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400">{p.marque}</p>
              <p className="font-bold text-gray-900 text-sm">{p.nom}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[#004AAD] font-bold">{formatPrice(p.prix)}</span>
                <span className="text-xs text-gray-400">Stock : {p.stock}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(p)} className="flex-1 btn-ghost text-xs py-1.5"><Edit2 size={12} /> Modifier</button>
                <button onClick={() => toggleVisible(p)} className="btn-ghost text-xs py-1.5 px-2">{p.visible ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                <button onClick={() => deleteProduit(p.id)} className="btn-ghost text-xs py-1.5 px-2 text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
              <h3 className="font-bold">{editing ? 'Modifier' : 'Nouveau produit'}</h3>
              <button onClick={() => setModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Catégorie</label>
                  <select {...register('categorie')} className="input">
                    <option value="smartphone">Smartphone</option>
                    <option value="pc">PC Portable</option>
                    <option value="tablette">Tablette</option>
                    <option value="accessoire">Accessoire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Marque</label>
                  <input {...register('marque')} className="input" placeholder="Apple" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nom *</label>
                <input {...register('nom', { required: true })} className="input" placeholder="iPhone 14 Pro 256Go" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Prix (€) *</label>
                  <input {...register('prix', { required: true })} type="number" className="input" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Stock</label>
                  <input {...register('stock')} type="number" className="input" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">État</label>
                  <select {...register('etat')} className="input">
                    <option>Très bon état</option>
                    <option>Bon état</option>
                    <option>État correct</option>
                    <option>Neuf</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Description</label>
                <textarea {...register('description')} className="input" rows={2} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Specs (une par ligne)</label>
                <textarea {...register('specs')} className="input" rows={3} placeholder="256 Go&#10;Face ID&#10;5G" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">URL Image</label>
                <input {...register('images.0')} className="input" placeholder="https://..." />
              </div>
              <div className="flex items-center gap-2">
                <input {...register('visible')} type="checkbox" id="vis" className="w-4 h-4" />
                <label htmlFor="vis" className="text-sm font-medium text-gray-700">Visible sur le site</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="btn-ghost flex-1 justify-center">Annuler</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
