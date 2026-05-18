import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'LDS INFORMATIK — Réparation & Services IT à Troyes',
  description: 'Réparation smartphone, PC portable et Mac à Troyes. Sans rendez-vous, diagnostic gratuit, garantie jusqu\'à 3 ans. Particuliers et professionnels.',
  keywords: 'réparation smartphone Troyes, réparateur PC Troyes, LDS Informatik, réparation iPhone Troyes, réparation Samsung, MacBook Troyes',
  authors: [{ name: 'LDS INFORMATIK' }],
  openGraph: {
    title: 'LDS INFORMATIK — Réparation & Services IT à Troyes',
    description: 'Réparation smartphone, PC portable et Mac à Troyes. Sans rendez-vous, diagnostic gratuit.',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: { background: '#1E293B', color: '#fff', borderRadius: '10px', fontSize: '13.5px' },
          success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
        }} />
      </body>
    </html>
  )
}
