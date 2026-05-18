import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollEffects from '@/components/ui/ScrollEffects'
import { createClient } from '@/lib/supabase-server'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const { data: configRow } = await supabase.from('config').select('valeur').eq('cle', 'boutique').single()
  const boutique = (configRow?.valeur as Record<string, string>) || {}

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar boutique={boutique} isLoggedIn={!!session} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer boutique={boutique} />
      <ScrollEffects />
    </div>
  )
}
