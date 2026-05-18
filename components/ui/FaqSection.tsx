'use client'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { Faq } from '@/types/database'

interface FaqSectionProps { faq: Faq[] }

export default function FaqSection({ faq }: FaqSectionProps) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Questions fréquentes</h2>
        </div>
        <div className="space-y-3">
          {faq.map(f => (
            <div key={f.id} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === f.id ? null : f.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{f.question}</span>
                {open === f.id ? <Minus size={18} className="text-[#004AAD] flex-shrink-0"/> : <Plus size={18} className="text-gray-400 flex-shrink-0"/>}
              </button>
              {open === f.id && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {f.reponse}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
