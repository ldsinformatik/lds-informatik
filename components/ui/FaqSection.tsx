'use client'
import { useState } from 'react'
import type { Faq } from '@/types/database'

export default function FaqSection({ faq }: { faq: Faq[] }) {
  const [open, setOpen] = useState<string|null>(null)
  return (
    <section style={{ background: '#fff' }}>
      <div className="sh" style={{ padding: '56px 32px 36px', background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <div className="stag reveal">FAQ</div>
        <div className="stitle reveal">Questions <strong>fréquentes</strong></div>
      </div>
      <div className="faq-wrap" style={{ padding: '20px 32px 48px' }}>
        {faq.map(f => (
          <div key={f.id} className="faq-item" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', marginBottom: '8px', overflow: 'hidden' }}>
            <div className="faq-q" onClick={() => setOpen(open === f.id ? null : f.id)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', cursor: 'pointer', fontSize: '13.5px', fontWeight: 600, color: 'var(--secondary)', transition: 'background .18s', background: open === f.id ? 'var(--light)' : 'transparent' }}>
              <span>{f.question}</span>
              <span style={{ fontSize: '18px', color: 'var(--primary)', transition: 'transform .25s', transform: open === f.id ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
            </div>
            {open === f.id && (
              <div style={{ padding: '0 20px 16px' }}>
                <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.7 }}>{f.reponse}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
