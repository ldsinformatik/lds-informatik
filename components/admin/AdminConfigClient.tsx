'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Save } from 'lucide-react'

export default function AdminConfigClient({ config }: { config: Record<string, any> }) {
  const b = config.boutique || {}
  const [form, setForm] = useState({
    nom: b.nom || 'LDS INFORMATIK',
    adresse: b.adresse || '145 Avenue Pierre Brossolette',
    cp: b.cp || '10000',
    ville: b.ville || 'Troyes',
    tel: b.tel || '07 45 01 41 27',
    email: b.email || 'contact@ldsinformatik.fr',
    email_cc: b.email_cc || 'troyes@ldsinformatik.fr',
    siret: b.siret || '94895280900044',
    tva: b.tva || 'FR07948952809',
    gerant: b.gerant || 'MORAND Ludovic',
    facebook: b.facebook || '',
    instagram: b.instagram || '',
    tiktok: b.tiktok || '',
    google_avis: b.google_avis || '',
    teamviewer: b.teamviewer || '',
    whatsapp: b.whatsapp || '33745014127',
  })
  const [saving, setSaving] = useState(false)
  const h = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cle: 'boutique', valeur: form }),
      })
      if (!res.ok) throw new Error()
      toast.success('Configuration enregistrée ✅')
    } catch { toast.error('Erreur') }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-5">📍 Adresse & contact</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: 'nom', l: 'Nom boutique' },
            { k: 'gerant', l: 'Gérant' },
            { k: 'adresse', l: 'Adresse' },
            { k: 'cp', l: 'Code postal' },
            { k: 'ville', l: 'Ville' },
            { k: 'tel', l: 'Téléphone' },
            { k: 'email', l: 'Email principal' },
            { k: 'email_cc', l: 'Email CC' },
            { k: 'siret', l: 'SIRET' },
            { k: 'tva', l: 'N° TVA' },
            { k: 'whatsapp', l: 'WhatsApp (sans +)' },
          ].map(f => (
            <div key={f.k}>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{f.l}</label>
              <input value={(form as any)[f.k]} onChange={h(f.k)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#004AAD]" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-5">🌐 Réseaux sociaux</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: 'facebook', l: 'Facebook URL' },
            { k: 'instagram', l: 'Instagram URL' },
            { k: 'tiktok', l: 'TikTok URL' },
            { k: 'google_avis', l: 'Google Avis URL' },
            { k: 'teamviewer', l: 'TeamViewer URL' },
          ].map(f => (
            <div key={f.k}>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{f.l}</label>
              <input value={(form as any)[f.k]} onChange={h(f.k)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#004AAD]" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save size={16} /> {saving ? 'Enregistrement...' : 'Enregistrer la configuration'}
        </button>
      </div>
    </div>
  )
}
