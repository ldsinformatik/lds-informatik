import { createClient } from '@/lib/supabase-server'
import HeroBanner from '@/components/ui/HeroBanner'
import TrustBand from '@/components/ui/TrustBand'
import ServicesGrid from '@/components/ui/ServicesGrid'
import AvisSection from '@/components/ui/AvisSection'
import PourquoiLDS from '@/components/ui/PourquoiLDS'
import FaqSection from '@/components/ui/FaqSection'
import PartenairesCarousel from '@/components/ui/PartenairesCarousel'
import CtaSection from '@/components/ui/CtaSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LDS INFORMATIK — Réparation & Services IT à Troyes',
  alternates: { canonical: '/accueil' },
}

export default async function AccueilPage() {
  const supabase = createClient()

  const [
    { data: avis },
    { data: faq },
    { data: partenaires },
    { data: configTrust },
    { data: configBoutique },
  ] = await Promise.all([
    supabase.from('avis').select('*').eq('actif', true).order('ordre'),
    supabase.from('faq').select('*').eq('visible', true).order('ordre'),
    supabase.from('partenaires').select('*').eq('actif', true).order('ordre'),
    supabase.from('config').select('valeur').eq('cle', 'trust').single(),
    supabase.from('config').select('valeur').eq('cle', 'boutique').single(),
  ])

  const trust = (configTrust?.valeur as Array<{valeur: string; label: string}>) || []
  const boutique = (configBoutique?.valeur as Record<string, string>) || {}

  return (
    <>
      <HeroBanner boutique={boutique} />
      <TrustBand items={trust} />
      <ServicesGrid />
      <PourquoiLDS />
      {avis && avis.length > 0 && <AvisSection avis={avis} />}
      {partenaires && partenaires.length > 0 && <PartenairesCarousel partenaires={partenaires} />}
      {faq && faq.length > 0 && <FaqSection faq={faq} />}
      <CtaSection boutique={boutique} />
    </>
  )
}
