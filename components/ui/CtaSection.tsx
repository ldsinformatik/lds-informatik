import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

interface CtaSectionProps { boutique: Record<string, string> }

export default function CtaSection({ boutique }: CtaSectionProps) {
  return (
    <section className="py-20 bg-[#004AAD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Besoin d'une assistance informatique ?
        </h2>
        <p className="text-blue-200 text-lg mb-10">
          Passez directement en boutique sans rendez-vous ou contactez-nous — nous répondons sous 2h.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/reparer" className="bg-white text-[#004AAD] font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2">
            Demander un devis <ArrowRight size={16} />
          </Link>
          <a href={`tel:${(boutique.tel || '0745014127').replace(/\s/g,'')}`}
            className="border-2 border-white/40 hover:border-white text-white font-bold px-7 py-3.5 rounded-xl transition-all flex items-center gap-2">
            <Phone size={16} /> {boutique.tel || '07 45 01 41 27'}
          </a>
        </div>
        <p className="text-blue-300 text-sm mt-8">
          145 Av. Pierre Brossolette, 10000 Troyes · Lun-Ven 9h30-18h30 · Sam 9h30-14h
        </p>
      </div>
    </section>
  )
}
