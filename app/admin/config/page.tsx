import { supabaseAdmin } from '@/lib/supabase'
import AdminConfigClient from '@/components/admin/AdminConfigClient'

export default async function AdminConfigPage() {
  const db = supabaseAdmin()
  const { data: rows } = await db.from('config').select('*')
  const config = Object.fromEntries((rows || []).map(r => [r.cle, r.valeur]))
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">⚙️ Configuration boutique</h1>
        <p className="text-gray-500 text-sm mt-1">Infos contact, horaires, zones desservies</p>
      </div>
      <AdminConfigClient config={config} />
    </div>
  )
}
