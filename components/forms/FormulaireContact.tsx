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
  tel: z.string().optional(),
  sujet: z.string().min(1, 'Sujet requis'),
  message: z.string().min(10, 'Message trop court'),
})
type FormData = z.infer<typeof schema>

interface Props { clientEmail?: string; clientId?: string }

export default function FormulaireContact({ clientEmail, clientId }: Props) {
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
        body: JSON.stringify({ ...data, type: 'contact', client_nom: data.nom, client_email: data.email, client_tel: data.tel, client_id: clientId }),
      })
      if (!res.ok) throw new Error('Erreur')
      setDone(true)
    } catch {
      toast.error('Erreur lors de l\'envoi')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div className="card p-10 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
      <p className="text-gray-500 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nom *</label>
          <input {...register('nom')} className="input" placeholder="Marie Dupont" />
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
          <input {...register('email')} type="email" className="input" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Téléphone</label>
          <input {...register('tel')} type="tel" className="input" placeholder="07 00 00 00 00" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Sujet *</label>
          <select {...register('sujet')} className="input">
            <option value="">Sélectionner...</option>
            <option>Question générale</option>
            <option>Réparation</option>
            <option>Achat / Produit</option>
            <option>Infogérance</option>
            <option>Autre</option>
          </select>
          {errors.sujet && <p className="text-red-500 text-xs mt-1">{errors.sujet.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Message *</label>
        <textarea {...register('message')} className="input" rows={5} placeholder="Votre message..." />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? 'Envoi...' : <><Send size={16} /> Envoyer le message</>}
      </button>
    </form>
  )
}
