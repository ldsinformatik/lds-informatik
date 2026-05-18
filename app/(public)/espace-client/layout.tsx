import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase-server'

export default async function EspaceClientLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const { data: configRow } = await supabase.from('config').select('valeur').eq('cle', 'boutique').single()
  const boutique = (configRow?.valeur as Record<string, string>) || {}

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar boutique={boutique} isLoggedIn={!!session} />
      <main className="flex-1 bg-gray-50 pt-16">{children}</main>
      <Footer boutique={boutique} />
    </div>
  )
}
