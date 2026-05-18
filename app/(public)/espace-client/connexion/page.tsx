'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { LogIn, Eye, EyeOff } from 'lucide-react'

export default function ConnexionPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error('Email ou mot de passe incorrect')
    } else {
      toast.success('Connexion réussie !')
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
            <LogIn size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Espace client</h1>
          <p className="text-gray-500 text-sm mt-2">Suivez vos réparations et réservations</p>
        </div>

        <form onSubmit={handleLogin} className="card p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="input" placeholder="vous@exemple.fr" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Mot de passe</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                className="input pr-10" placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Pas encore de compte ?{' '}
          <Link href="/espace-client/inscription" className="text-[#004AAD] font-semibold hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}
