'use client'
import { useEffect, useRef, useState } from 'react'

function Counter({ val }: { val: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const num = parseFloat(val.replace(',', '.').replace(/[^0-9.]/g, ''))
        if (isNaN(num)) { setDisplay(val); return }
        const dur = 1500; const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const cur = Math.floor(p * num)
          setDisplay(val.replace(/[\d,.]+/, cur.toString().replace('.', ',')))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [val])
  return <span ref={ref} className="trust-num count-anim">{display}</span>
}

export default function TrustBand({ items }: { items: Array<{valeur: string; label: string}> }) {
  const data = items.length > 0 ? items : [
    { valeur: '10 ans', label: "D'expertise terrain" },
    { valeur: '99,9 %', label: 'Clients satisfaits' },
    { valeur: '3 ans', label: 'Garantie incluse' },
  ]
  return (
    <div className="trust-band" style={{ display: 'grid', gridTemplateColumns: `repeat(${data.length},1fr)`, background: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      {data.map((item, i) => (
        <div key={i} className="trust-item" style={{ padding: '18px 20px', textAlign: 'center', position: 'relative', borderRight: i < data.length - 1 ? '1px solid var(--border)' : 'none' }}>
          <Counter val={item.valeur} />
          <div className="trust-lbl" style={{ fontSize: '11.5px', color: 'var(--gray)', marginTop: '4px' }}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}
