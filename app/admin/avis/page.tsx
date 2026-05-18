import { supabaseAdmin } from '@/lib/supabase'
import AdminAvisClient from '@/components/admin/AdminAvisClient'

export default async function AdminAvisPage() {
  const db = supabaseAdmin()
  const { data: avis } = await db.from('avis').select('*').order('ordre')
  return (
    <div className="p-8">
      <div className="mb-8"><h1 className="text-2xl font-extrabold text-gray-900">⭐ Avis clients</h1></div>
      <AdminAvisClient avis={avis || []} />
    </div>
  )
}
