'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Send } from 'lucide-react'

const schema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  tel: z.string().min(8, 'Téléphone requis'),
  entreprise: z.string().min(1, 'Entreprise requise'),
  nb_postes: z.string().min(1, 'Requis'),
  besoins: z.string().min(10, 'Décrivez vos besoins'),
})
type FormData = z.infer<typeof schema>

interface Props { clientId?: string; clientEmail?: string }

export default function FormulaireInfogerance({ clientId, clientEmail }: Props) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: clientEmail || '' },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'infogerance', client_id: clientId }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
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
      <h3 className="text-xl font-bold mb-2">Demande envoyée !</h3>
      <p className="text-gray-500 text-sm">Nous vous contacterons dans les 2h. Bien cordialement,</p>
      <p className="font-semibold mt-1">L'équipe LDS INFORMATIK</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nom *</label>
          <input {...register('nom')} className="input" placeholder="Dupont" />
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Entreprise *</label>
          <input {...register('entreprise')} className="input" placeholder="Ma Société SAS" />
          {errors.entreprise && <p className="text-red-500 text-xs mt-1">{errors.entreprise.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
          <input {...register('email')} type="email" className="input" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Téléphone *</label>
          <input {...register('tel')} type="tel" className="input" placeholder="03 25 00 00 00" />
          {errors.tel && <p className="text-red-500 text-xs mt-1">{errors.tel.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nombre de postes *</label>
        <select {...register('nb_postes')} className="input">
          <option value="">Sélectionner...</option>
          <option value="1-5">1 à 5 postes</option>
          <option value="6-15">6 à 15 postes</option>
          <option value="16-50">16 à 50 postes</option>
          <option value="50+">Plus de 50 postes</option>
        </select>
        {errors.nb_postes && <p className="text-red-500 text-xs mt-1">{errors.nb_postes.message}</p>}
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Décrivez vos besoins *</label>
        <textarea {...register('besoins')} className="input" rows={4} placeholder="Maintenance parc, Microsoft 365, cybersécurité, support utilisateurs..." />
        {errors.besoins && <p className="text-red-500 text-xs mt-1">{errors.besoins.message}</p>}
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? 'Envoi...' : <><Send size={16} /> Envoyer ma demande</>}
      </button>
    </form>
  )
}
