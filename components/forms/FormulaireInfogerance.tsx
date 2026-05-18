'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

const igState = { prenom:'',nom:'',entreprise:'',email:'',tel:'',postes:'',prestataire:'',sauvegarde:'',m365:'',besoins:[] as string[],message:'' }

export default function FormulaireInfogerance({ clientId, clientEmail }: { clientId?: string; clientEmail?: string }) {
  const [form, setForm] = useState({ ...igState, email: clientEmail || '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const h = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }))
  const single = (k: string, v: string) => setForm(f => ({ ...f, [k]: f[k as keyof typeof f] === v ? '' : v }))
  const multi = (v: string) => setForm(f => ({ ...f, besoins: f.besoins.includes(v) ? f.besoins.filter(x => x !== v) : [...f.besoins, v] }))
  const sel = (v: string, cur: string) => ({ padding: '9px 16px', borderRadius: '10px', border: cur === v ? '2px solid var(--primary)' : '1.5px solid var(--border)', fontSize: '12.5px', fontWeight: cur === v ? 600 : 500, cursor: 'pointer', transition: 'all .18s', background: cur === v ? 'var(--light)' : '#fff', color: cur === v ? 'var(--primary)' : 'var(--secondary)' })
  const selM = (v: string) => ({ padding: '9px 16px', borderRadius: '10px', border: form.besoins.includes(v) ? '2px solid var(--primary)' : '1.5px solid var(--border)', fontSize: '12.5px', fontWeight: form.besoins.includes(v) ? 600 : 500, cursor: 'pointer', transition: 'all .18s', background: form.besoins.includes(v) ? 'var(--light)' : '#fff', color: form.besoins.includes(v) ? 'var(--primary)' : 'var(--secondary)' })

  const submit = async () => {
    if (!form.prenom || !form.nom || !form.email || !form.tel || !form.entreprise || !form.postes) { toast.error('Remplissez tous les champs obligatoires'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'infogerance', client_id: clientId || null, client_nom: `${form.prenom} ${form.nom}`, client_email: form.email, client_tel: form.tel, entreprise: form.entreprise, nb_postes: form.postes, besoins: `${form.prestataire ? 'Prestataire: '+form.prestataire+'. ' : ''}${form.sauvegarde ? 'Sauvegarde: '+form.sauvegarde+'. ' : ''}${form.m365 ? 'Suite: '+form.m365+'. ' : ''}Besoins: ${form.besoins.join(', ')}`, message: form.message }),
      })
      if (!res.ok) throw new Error('Erreur')
      setDone(true)
    } catch { toast.error('Erreur lors de l\'envoi') }
    setLoading(false)
  }

  if (done) return (
    <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '40px', boxShadow: 'var(--shadow)', textAlign: 'center' }} className="card-static">
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✅</div>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '10px' }}>Demande envoyée !</h2>
      <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.8 }}>Nous avons bien reçu votre demande, nous vous contacterons dans un délai de 2h.<br /><br />Bien cordialement,</p>
    </div>
  )

  return (
    <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '28px', boxShadow: 'var(--shadow)' }} className="card-static">
      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--primary)', fontWeight: 700, marginBottom: '18px' }}>Échangeons sur vos besoins informatiques</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div><label className="fl">Prénom *</label><input className="fc" value={form.prenom} onChange={h('prenom')} placeholder="Jean" /></div>
        <div><label className="fl">Nom *</label><input className="fc" value={form.nom} onChange={h('nom')} placeholder="Dupont" /></div>
      </div>
      <label className="fl">Entreprise *</label><input className="fc" value={form.entreprise} onChange={h('entreprise')} placeholder="Ma société" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div><label className="fl">Email *</label><input className="fc" type="email" value={form.email} onChange={h('email')} placeholder="jean@société.fr" /></div>
        <div><label className="fl">Téléphone *</label><input className="fc" type="tel" value={form.tel} onChange={h('tel')} placeholder="06 00 00 00 00" /></div>
      </div>
      <label className="fl">Nombre de postes *</label>
      <select className="fc" value={form.postes} onChange={h('postes')}>
        <option value="">Sélectionner…</option>
        <option>1 – 3 postes</option><option>4 – 10 postes</option><option>11 – 25 postes</option><option>26 – 50 postes</option><option>50+ postes</option>
      </select>
      <label className="fl" style={{ marginTop: '4px' }}>Avez-vous déjà un prestataire informatique ?</label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {['Oui','Non','Gestion interne'].map(v => <button key={v} onClick={() => single('prestataire', v)} style={sel(v, form.prestataire)}>{v}</button>)}
      </div>
      <label className="fl">Avez-vous une solution de sauvegarde ?</label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {['Oui, cloud','Oui, locale','Non','Je ne sais pas'].map(v => <button key={v} onClick={() => single('sauvegarde', v)} style={sel(v, form.sauvegarde)}>{v}</button>)}
      </div>
      <label className="fl">Utilisez-vous Microsoft 365 / Google Workspace ?</label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {['Microsoft 365','Google Workspace','Messagerie locale','Aucun'].map(v => <button key={v} onClick={() => single('m365', v)} style={sel(v, form.m365)}>{v}</button>)}
      </div>
      <label className="fl">Vos besoins prioritaires</label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['🔐 Cybersécurité','☁️ Sauvegarde','🔧 Maintenance','📧 Messagerie pro','🌐 Réseau / Wi-Fi','🎧 Support utilisateurs'].map(v => (
          <button key={v} onClick={() => multi(v)} style={selM(v)}>{v}</button>
        ))}
      </div>
      <label className="fl">Message complémentaire</label>
      <textarea className="fc" value={form.message} onChange={h('message')} style={{ height: '72px', resize: 'none' }} placeholder="Décrivez votre contexte ou vos contraintes…" />
      <button onClick={submit} disabled={loading} className="sbtn" style={{ marginTop: '4px' }}>{loading ? 'Envoi...' : 'Envoyer ma demande'}</button>
    </div>
  )
}
