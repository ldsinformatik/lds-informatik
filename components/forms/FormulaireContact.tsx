'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function FormulaireContact({ clientEmail, clientId }: { clientEmail?: string; clientId?: string }) {
  const [form, setForm] = useState({ nom: '', email: clientEmail || '', tel: '', sujet: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const h = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.nom || !form.email || !form.message) { toast.error('Remplissez les champs obligatoires'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/demandes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'contact', client_id: clientId || null, client_nom: form.nom, client_email: form.email, client_tel: form.tel, message: `[${form.sujet}] ${form.message}` }) })
      if (!res.ok) throw new Error('Erreur')
      setDone(true)
    } catch { toast.error('Erreur lors de l\'envoi') }
    setLoading(false)
  }

  if (done) return (
    <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '40px', boxShadow: 'var(--shadow)', textAlign: 'center' }} className="card-static">
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✅</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px' }}>Message envoyé !</h3>
      <p style={{ fontSize: '13px', color: 'var(--gray)' }}>Nous vous répondrons dans les plus brefs délais.</p>
    </div>
  )

  return (
    <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '28px', boxShadow: 'var(--shadow)' }} className="card-static">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div><label className="fl">Prénom Nom *</label><input className="fc" value={form.nom} onChange={h('nom')} placeholder="Jean Dupont" /></div>
        <div><label className="fl">Email *</label><input className="fc" type="email" value={form.email} onChange={h('email')} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div><label className="fl">Téléphone</label><input className="fc" type="tel" value={form.tel} onChange={h('tel')} placeholder="06 00 00 00 00" /></div>
        <div><label className="fl">Sujet</label>
          <select className="fc" value={form.sujet} onChange={h('sujet')}>
            <option value="">Sélectionner...</option>
            <option>Question générale</option><option>Réparation</option><option>Achat / Produit</option><option>Infogérance</option><option>Autre</option>
          </select>
        </div>
      </div>
      <label className="fl">Message *</label>
      <textarea className="fc" value={form.message} onChange={h('message')} style={{ height: '120px' }} placeholder="Votre message..." />
      <button onClick={submit} disabled={loading} className="sbtn">{loading ? 'Envoi...' : 'Envoyer le message'}</button>
    </div>
  )
}
