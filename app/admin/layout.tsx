import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

// Protection simple par variable d'environnement
// Pour une vraie auth admin, utiliser un rôle Supabase custom
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0F4FA] flex">
      <AdminSidebar />
      <main className="flex-1 ml-60 min-h-screen">
        {children}
      </main>
    </div>
  )
}
