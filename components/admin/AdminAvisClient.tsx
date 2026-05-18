'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, X, Edit2, Trash2 } from 'lucide-react'
import type { Avis } from '@/types/database'

export default function AdminAvisClient({ avis: initial }: { avis: Avis[] }) {
  const [avis, setAvis] = useState(initial)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Avis | null>(null)
  const [form, setForm] = useState({ nom: '', note: 5, date_texte: '', contenu: '', actif: true })
  const [saving, setSaving] = useState(false)
  const h = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: k === 'note' ? +e.target.value : k === 'actif' ? e.target.checked : e.target.value }))

  const open = (a?: Avis) => {
    setEditing(a || null)
    setForm(a ? { nom: a.nom, note: a.note, date_texte: a.date_texte || '', contenu: a.contenu, actif: a.actif } : { nom: '', note: 5, date_texte: '', contenu: '', actif: true })
    setModal(true)
  }

  const save = async () => {
    setSaving(true)
    try {
      const url = editing ? `/api/admin/avis/${editing.id}` : '/api/admin/avis'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const json = await res.json()
      if (!res.ok) throw new Error()
      if (editing) { setAvis(prev => prev.map(a => a.id === editing.id ? { ...a, ...form } : a)) }
      else { setAvis(prev => [...prev, json.data]) }
      toast.success('Enregistré ✅'); setModal(false)
    } catch { toast.error('Erreur') }
    setSaving(false)
  }

  const toggle = async (a: Avis) => {
    await fetch(`/api/admin/avis/${a.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ actif: !a.actif }) })
    setAvis(prev => prev.map(x => x.id === a.id ? { ...x, actif: !x.actif } : x))
  }

  const del = async (id: string) => {
    if (!confirm('Supprimer ?')) return
    await fetch(`/api/admin/avis/${id}`, { method: 'DELETE' })
    setAvis(prev => prev.filter(a => a.id !== id))
    toast.success('Supprimé')
  }

  return (
    <>
      <div className="flex justify-end mb-5"><button onClick={() => open()} className="btn-primary"><Plus size={16} /> Ajouter un avis</button></div>
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {avis.map(a => (
          <div key={a.id} className={`flex items-center gap-4 p-4 ${!a.actif ? 'opacity-50' : ''}`}>
            <div className="w-10 h-10 bg-[#004AAD] rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">{a.nom.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{a.nom}</p>
              <p className="text-yellow-400 text-xs">{'⭐'.repeat(a.note)}</p>
              <p className="text-gray-500 text-xs truncate mt-0.5">{a.contenu}</p>
            </div>
            <p className="text-gray-400 text-xs hidden sm:block">{a.date_texte}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => toggle(a)} className={`text-xs px-3 py-1 rounded-full font-medium ${a.actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {a.actif ? 'Actif' : 'Masqué'}
              </button>
              <button onClick={() => open(a)} className="btn-ghost py-1.5 px-2"><Edit2 size={13} /></button>
              <button onClick={() => del(a.id)} className="btn-ghost py-1.5 px-2 text-red-500"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold">{editing ? 'Modifier' : 'Nouvel avis'}</h3>
              <button onClick={() => setModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nom</label>
                  <input value={form.nom} onChange={h('nom')} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Note</label>
                  <select value={form.note} onChange={h('note')} className="input">
                    <option value={5}>⭐⭐⭐⭐⭐ 5/5</option>
                    <option value={4}>⭐⭐⭐⭐ 4/5</option>
                    <option value={3}>⭐⭐⭐ 3/5</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Date affichée</label>
                <input value={form.date_texte} onChange={h('date_texte')} className="input" placeholder="il y a un mois" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Contenu</label>
                <textarea value={form.contenu} onChange={h('contenu')} className="input" rows={3} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.actif} onChange={h('actif')} className="w-4 h-4" />
                Avis actif (visible)
              </label>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(false)} className="btn-ghost flex-1 justify-center">Annuler</button>
              <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
