import { supabaseAdmin } from '@/lib/supabase'
import AdminDemandesClient from '@/components/admin/AdminDemandesClient'

export default async function AdminDemandesPage() {
  const db = supabaseAdmin()
  const { data: demandes } = await db
    .from('demandes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">📥 Demandes</h1>
        <p className="text-gray-500 text-sm mt-1">{demandes?.length || 0} demande(s) au total</p>
      </div>
      <AdminDemandesClient demandes={demandes || []} />
    </div>
  )
}
