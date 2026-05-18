'use client'
import { useState, useMemo } from 'react'
import { formatDate, statutLabel, statutColor } from '@/lib/utils'
import toast from 'react-hot-toast'
import { Search, X, ChevronDown } from 'lucide-react'
import type { Demande } from '@/types/database'

const TYPES = [
  { value: '', label: 'Tous types' },
  { value: 'reparation', label: 'Réparation' },
  { value: 'pc_sur_mesure', label: 'PC sur mesure' },
  { value: 'infogerance', label: 'Infogérance' },
  { value: 'contact', label: 'Contact' },
]
const STATUTS = [
  { value: '', label: 'Tous statuts' },
  { value: 'nouveau', label: 'Nouveau' },
  { value: 'en_attente', label: 'En attente' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'termine', label: 'Terminé' },
  { value: 'annule', label: 'Annulé' },
]

export default function AdminDemandesClient({ demandes: initial }: { demandes: Demande[] }) {
  const [demandes, setDemandes] = useState(initial)
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [statut, setStatut] = useState('')
  const [selected, setSelected] = useState<Demande | null>(null)
  const [newStatut, setNewStatut] = useState('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() => demandes.filter(d => {
    const matchQ = !q || d.client_nom.toLowerCase().includes(q.toLowerCase()) || d.client_email.toLowerCase().includes(q.toLowerCase()) || d.ref.toLowerCase().includes(q.toLowerCase())
    const matchT = !type || d.type === type
    const matchS = !statut || d.statut === statut
    return matchQ && matchT && matchS
  }), [demandes, q, type, statut])

  const openModal = (d: Demande) => { setSelected(d); setNewStatut(d.statut); setNote(d.notes_admin || '') }

  const saveStatut = async () => {
    if (!selected) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/demandes/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut: newStatut, notes_admin: note }),
      })
      if (!res.ok) throw new Error()
      setDemandes(prev => prev.map(d => d.id === selected.id ? { ...d, statut: newStatut, notes_admin: note } : d))
      toast.success('Demande mise à jour ✅')
      setSelected(null)
    } catch { toast.error('Erreur') }
    setSaving(false)
  }

  return (
    <>
      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#004AAD]" />
        </div>
        <select value={type} onChange={e => setType(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#004AAD]">
          {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <select value={statut} onChange={e => setStatut(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#004AAD]">
          {STATUTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <span className="text-sm text-gray-500 self-center">{filtered.length} résultat(s)</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Réf.', 'Client', 'Type', 'Détail', 'Date', 'Statut', ''].map(h => (
                <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-gray-400">Aucune demande</td></tr>
            ) : filtered.map(d => (
              <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => openModal(d)}>
                <td className="px-4 py-3"><code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{d.ref}</code></td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-sm text-gray-900">{d.client_nom}</div>
                  <div className="text-xs text-gray-400">{d.client_email}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{d.type?.replace('_', ' ')}</td>
                <td className="px-4 py-3 text-sm text-gray-500 max-w-[160px] truncate">
                  {d.appareil} {d.marque} {d.modele || d.message?.substring(0, 30)}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{formatDate(d.created_at)}</td>
                <td className="px-4 py-3"><span className={`badge text-xs ${statutColor(d.statut)}`}>{statutLabel(d.statut)}</span></td>
                <td className="px-4 py-3 text-[#004AAD] text-xs font-semibold">Voir →</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
              <h3 className="font-bold text-gray-900">Demande — {selected.ref}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400 text-xs uppercase font-bold block mb-0.5">Client</span>{selected.client_nom}</div>
                <div><span className="text-gray-400 text-xs uppercase font-bold block mb-0.5">Email</span><a href={`mailto:${selected.client_email}`} className="text-[#004AAD]">{selected.client_email}</a></div>
                <div><span className="text-gray-400 text-xs uppercase font-bold block mb-0.5">Téléphone</span><a href={`tel:${selected.client_tel}`} className="text-[#004AAD]">{selected.client_tel || '—'}</a></div>
                <div><span className="text-gray-400 text-xs uppercase font-bold block mb-0.5">Date</span>{formatDate(selected.created_at)}</div>
              </div>
              {selected.type === 'reparation' && (
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <p><strong>Appareil :</strong> {selected.appareil} {selected.marque} {selected.modele}</p>
                  {selected.prestations && <p><strong>Prestation(s) :</strong> {selected.prestations.join(', ')}</p>}
                </div>
              )}
              {selected.message && <div className="bg-gray-50 rounded-xl p-4 text-sm"><strong>Message :</strong><br/>{selected.message}</div>}
              <hr className="border-gray-100" />
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Changer le statut</label>
                <select value={newStatut} onChange={e => setNewStatut(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#004AAD]">
                  {STATUTS.filter(s => s.value).map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Note interne</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#004AAD] resize-none"
                  placeholder="Note visible uniquement par l'admin..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t">
              <button onClick={() => setSelected(null)} className="btn-ghost">Annuler</button>
              <button onClick={saveStatut} disabled={saving} className="btn-primary">
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
