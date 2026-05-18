'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { UserPlus } from 'lucide-react'

export default function InscriptionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', tel: '', password: '', confirm: '' })

  const handle = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Les mots de passe ne correspondent pas'); return }
    if (form.password.length < 6) { toast.error('Mot de passe trop court (6 caractères min.)'); return }
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { prenom: form.prenom, nom: form.nom, telephone: form.tel } }
    })

    if (error) {
      toast.error(error.message)
    } else if (data.user) {
      // Mettre à jour le profil
      await supabase.from('profiles').update({ prenom: form.prenom, nom: form.nom, telephone: form.tel } as any).eq('id', data.user.id)
      toast.success('Compte créé ! Vous êtes connecté.')
      router.push('/espace-client/tableau-de-bord')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#004AAD] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Créer un compte</h1>
          <p className="text-gray-500 text-sm mt-2">Suivez vos réparations et réservations en ligne</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Prénom *</label>
              <input value={form.prenom} onChange={handle('prenom')} className="input" placeholder="Marie" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nom *</label>
              <input value={form.nom} onChange={handle('nom')} className="input" placeholder="Dupont" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
            <input type="email" value={form.email} onChange={handle('email')} className="input" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Téléphone</label>
            <input type="tel" value={form.tel} onChange={handle('tel')} className="input" placeholder="07 00 00 00 00" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Mot de passe *</label>
            <input type="password" value={form.password} onChange={handle('password')} className="input" placeholder="Minimum 6 caractères" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Confirmer *</label>
            <input type="password" value={form.confirm} onChange={handle('confirm')} className="input" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
            {loading ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Déjà un compte ?{' '}
          <Link href="/espace-client/connexion" className="text-[#004AAD] font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
