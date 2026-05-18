'use client'
import { useEffect, useRef, useState } from 'react'

interface TrustBandProps {
  items: Array<{ valeur: string; label: string }>
}

function Counter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const num = parseFloat(target.replace(',', '.').replace('%', '').replace(' ans', ''))
        if (isNaN(num)) { setDisplay(target); return }
        let start = 0
        const duration = 1500
        const step = (timestamp: number, startTime: number) => {
          const progress = Math.min((timestamp - startTime) / duration, 1)
          const val = Math.floor(progress * num)
          setDisplay(target.replace(/[\d,.]+/, val.toString().replace('.', ',')))
          if (progress < 1) requestAnimationFrame(ts => step(ts, startTime))
        }
        requestAnimationFrame(ts => step(ts, ts))
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <div ref={ref} className="text-4xl font-extrabold text-white">{display}</div>
}

export default function TrustBand({ items }: TrustBandProps) {
  const defaultItems = [
    { valeur: '10 ans', label: "D'expertise terrain" },
    { valeur: '99,9 %', label: 'Clients satisfaits' },
    { valeur: '3 ans', label: 'Garantie incluse' },
  ]
  const data = items.length > 0 ? items : defaultItems

  return (
    <section className="bg-[#004AAD] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Counter target={item.valeur} />
              <p className="text-blue-200 font-medium text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
