import { supabaseAdmin } from '@/lib/supabase'
import AdminProduitsClient from '@/components/admin/AdminProduitsClient'

export default async function AdminProduitsPage() {
  const db = supabaseAdmin()
  const { data: produits } = await db.from('produits').select('*').order('ordre')
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">📦 Produits en vente</h1>
          <p className="text-gray-500 text-sm mt-1">{produits?.length || 0} produit(s)</p>
        </div>
      </div>
      <AdminProduitsClient produits={produits || []} />
    </div>
  )
}
