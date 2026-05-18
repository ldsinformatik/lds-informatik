'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Send, ChevronRight, ChevronLeft } from 'lucide-react'

const schema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  tel: z.string().min(8, 'Téléphone requis'),
  appareil: z.string().min(1, 'Choisir un appareil'),
  marque: z.string().optional(),
  modele: z.string().optional(),
  prestations: z.array(z.string()).min(1, 'Choisir au moins une prestation'),
  message: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const appareils = [
  { value: 'smartphone', label: '📱 Smartphone' },
  { value: 'pc', label: '💻 PC Portable' },
  { value: 'tablette', label: '📟 Tablette' },
  { value: 'autre', label: '🔧 Autre appareil' },
]
const marques: Record<string, string[]> = {
  smartphone: ['Apple (iPhone)', 'Samsung', 'Xiaomi', 'Oppo', 'Huawei', 'Google Pixel', 'Autre'],
  pc: ['Apple (MacBook)', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Microsoft Surface', 'Autre'],
  tablette: ['Apple (iPad)', 'Samsung', 'Autre'],
  autre: ['Autre'],
}
const prestationsOptions: Record<string, string[]> = {
  smartphone: ['Remplacement écran', 'Remplacement batterie', 'Connecteur de charge', 'Remplacement châssis', 'Haut-parleur / micro', 'Diagnostic'],
  pc: ['Remplacement écran', 'Remplacement batterie', 'Remplacement clavier', 'Remplacement trackpad', 'Connecteur de charge', 'Topcase', 'Nettoyage', 'Réinstallation OS', 'Diagnostic'],
  tablette: ['Remplacement écran', 'Remplacement batterie', 'Connecteur de charge', 'Diagnostic'],
  autre: ['Diagnostic', 'Autre panne'],
}

interface Props { clientId?: string; clientEmail?: string }

export default function FormulaireReparation({ clientId, clientEmail }: Props) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [ref, setRef] = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: clientEmail || '', prestations: [] },
  })

  const appareil = watch('appareil')
  const prestations = watch('prestations') || []

  const togglePrestation = (p: string) => {
    const cur = prestations
    setValue('prestations', cur.includes(p) ? cur.filter(x => x !== p) : [...cur, p])
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'reparation', client_id: clientId }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setRef(json.ref)
      setDone(true)
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors de l\'envoi')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div className="card p-10 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
      <p className="text-gray-500 mb-4">Référence : <strong className="text-[#004AAD]">{ref}</strong></p>
      <p className="text-gray-500 text-sm">Nous vous contacterons dans les 2h. Bien cordialement,</p>
      <p className="font-semibold text-gray-900 mt-1">L'équipe LDS INFORMATIK</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-8">
      {/* Étape 1 — Appareil */}
      {step === 1 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-5">Quel appareil à réparer ?</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {appareils.map(a => (
              <button key={a.value} type="button"
                onClick={() => { setValue('appareil', a.value); setValue('marque', ''); setValue('prestations', []) }}
                className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${appareil === a.value ? 'border-[#004AAD] bg-blue-50 text-[#004AAD]' : 'border-gray-200 hover:border-gray-300'}`}>
                {a.label}
              </button>
            ))}
          </div>
          {errors.appareil && <p className="text-red-500 text-xs mb-3">{errors.appareil.message}</p>}

          {appareil && (
            <>
              <div className="fg mb-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Marque</label>
                <select {...register('marque')} className="input">
                  <option value="">Sélectionner...</option>
                  {marques[appareil]?.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="fg mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Modèle (optionnel)</label>
                <input {...register('modele')} className="input" placeholder="Ex : iPhone 14 Pro, MacBook Air M2..." />
              </div>
            </>
          )}

          <button type="button" onClick={() => { if (!appareil) { toast.error('Choisir un appareil'); return; } setStep(2) }}
            className="btn-primary w-full justify-center">
            Suivant <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Étape 2 — Prestations */}
      {step === 2 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-5">Quelle(s) prestation(s) ?</h3>
          <div className="grid grid-cols-1 gap-2 mb-6">
            {(prestationsOptions[appareil] || []).map(p => (
              <button key={p} type="button"
                onClick={() => togglePrestation(p)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-sm font-medium transition-all text-left ${prestations.includes(p) ? 'border-[#004AAD] bg-blue-50 text-[#004AAD]' : 'border-gray-200 hover:border-gray-300'}`}>
                <span className={`w-4 h-4 rounded border-2 flex-shrink-0 ${prestations.includes(p) ? 'bg-[#004AAD] border-[#004AAD]' : 'border-gray-300'}`} />
                {p}
              </button>
            ))}
          </div>
          {errors.prestations && <p className="text-red-500 text-xs mb-3">{errors.prestations.message}</p>}

          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description complémentaire (optionnel)</label>
            <textarea {...register('message')} className="input" rows={3} placeholder="Décrivez la panne en détail..." />
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="btn-ghost flex-1 justify-center">
              <ChevronLeft size={16} /> Retour
            </button>
            <button type="button" onClick={() => { if (!prestations.length) { toast.error('Choisir au moins une prestation'); return; } setStep(3) }}
              className="btn-primary flex-1 justify-center">
              Suivant <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Étape 3 — Coordonnées */}
      {step === 3 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-5">Vos coordonnées</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom complet *</label>
              <input {...register('nom')} className="input" placeholder="Marie Dupont" />
              {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email *</label>
              <input {...register('email')} type="email" className="input" placeholder="marie@exemple.fr" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Téléphone *</label>
              <input {...register('tel')} type="tel" className="input" placeholder="07 45 01 41 27" />
              {errors.tel && <p className="text-red-500 text-xs mt-1">{errors.tel.message}</p>}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600">
            <p className="font-semibold text-gray-900 mb-1">Récapitulatif</p>
            <p>Appareil : {appareils.find(a => a.value === appareil)?.label}</p>
            <p>Prestation(s) : {prestations.join(', ')}</p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="btn-ghost flex-1 justify-center">
              <ChevronLeft size={16} /> Retour
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? 'Envoi...' : <><Send size={16} /> Envoyer</>}
            </button>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="flex gap-2 mt-6">
        {[1,2,3].map(s => (
          <div key={s} className={`flex-1 h-1 rounded-full transition-all ${s <= step ? 'bg-[#004AAD]' : 'bg-gray-100'}`} />
        ))}
      </div>
    </form>
  )
}
