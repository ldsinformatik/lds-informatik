'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { generateRef } from '@/lib/utils'

const IPHONES = ['iPhone 17 Pro Max','iPhone 17 Pro','iPhone 17','iPhone 16 Pro Max','iPhone 16 Pro','iPhone 16 Plus','iPhone 16','iPhone 15 Pro Max','iPhone 15 Pro','iPhone 15 Plus','iPhone 15','iPhone 14 Pro Max','iPhone 14 Pro','iPhone 14 Plus','iPhone 14','iPhone 13 Pro Max','iPhone 13 Pro','iPhone 13 Mini','iPhone 13','iPhone 12 Pro Max','iPhone 12 Pro','iPhone 12 Mini','iPhone 12','iPhone SE 2022','iPhone 11 Pro Max','iPhone 11 Pro','iPhone 11','iPhone SE 2020','iPhone XS Max','iPhone XS','iPhone XR','iPhone X','iPhone 8 Plus','iPhone 8']
const SAMSUNG_S = ['Galaxy S26 Ultra','Galaxy S26+','Galaxy S26','Galaxy S25 Ultra','Galaxy S25+','Galaxy S25','Galaxy S24 Ultra','Galaxy S24+','Galaxy S24','Galaxy S23 Ultra','Galaxy S23+','Galaxy S23','Galaxy S22 Ultra','Galaxy S22+','Galaxy S22','Galaxy S21 Ultra','Galaxy S21+','Galaxy S21','Galaxy S20 Ultra','Galaxy S20+','Galaxy S20','Galaxy S20 FE','Galaxy S10+','Galaxy S10']
const SAMSUNG_A = ['Galaxy A57','Galaxy A37','Galaxy A17','Galaxy A56','Galaxy A36','Galaxy A16','Galaxy A55','Galaxy A35','Galaxy A15','Galaxy A54','Galaxy A34','Galaxy A14','Galaxy A53','Galaxy A33','Galaxy A13','Galaxy A52s','Galaxy A32','Galaxy A12','Galaxy A52','Galaxy A31','Galaxy A11','Galaxy A51','Galaxy A21s','Galaxy A10']
const MAC_AIR = ['MacBook Air 15" (M5)','MacBook Air 13" (M5)','MacBook Air 15" (M4)','MacBook Air 13" (M4)','MacBook Air 15" (M3)','MacBook Air 13" (M3)','MacBook Air 15" (M2)','MacBook Air 13" (M2)','MacBook Air 13" (M1)','MacBook Air Retina 13" (2020)','MacBook Air Retina 13" (2019)','MacBook Air Retina 13" (2018)','MacBook Air 13" (2017)','MacBook Air 13" (2016)','MacBook Air 13" (2015)','MacBook Air 11" (2015)']
const MAC_PRO = ['MacBook Pro 16" (M5)','MacBook Pro 14" (M5)','MacBook Pro 16" (M4)','MacBook Pro 14" (M4)','MacBook Pro 16" (M3 Pro/Max)','MacBook Pro 14" (M3/Pro)','MacBook Pro 16" (M2 Pro/Max)','MacBook Pro 14" (M2 Pro/Max)','MacBook Pro 16" (M1 Pro/Max)','MacBook Pro 14" (M1 Pro/Max)','MacBook Pro 13" (M1)','MacBook Pro 16" (Intel)','MacBook Pro 15" (2019)','MacBook Pro 13" (2019)','MacBook Pro 15" (2018)','MacBook Pro 13" (2018)','MacBook Pro 15" (2017)','MacBook Pro 13" (2017)','MacBook Pro 15" (2016)','MacBook Pro 13" (2016)','MacBook Pro Retina 15" (2015)','MacBook Pro Retina 13" (2015)']
const PC_MARQUES = ['Dell','HP','Lenovo','Asus','Acer','MSI','Microsoft Surface','Autre']
const AUTRES_MARQUES = ['Xiaomi','Oppo','Huawei','Google Pixel','Autre modèle']
const PRESTA_SM = ['Remplacement écran','Remplacement batterie','Connecteur de charge','Remplacement châssis','Haut-parleur / micro','Diagnostic']
const PRESTA_PC = ['Remplacement écran','Remplacement batterie','Remplacement clavier','Remplacement trackpad','Connecteur de charge','Remplacement topcase','Nettoyage ventilation','Réinstallation OS','Autre panne (diagnostic)']

type Step = 'appareil' | 'marque' | 'gamme_samsung' | 'gamme_mac' | 'modele' | 'prestations' | 'coordonnees' | 'confirmation'

export default function FormulaireReparation({ clientId, clientEmail }: { clientId?: string; clientEmail?: string }) {
  const [step, setStep] = useState<Step>('appareil')
  const [appareil, setAppareil] = useState('')
  const [marque, setMarque] = useState('')
  const [gamme, setGamme] = useState('')
  const [modele, setModele] = useState('')
  const [prestations, setPrestations] = useState<string[]>([])
  const [coords, setCoords] = useState({ nom: '', email: clientEmail || '', tel: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [ref, setRef] = useState('')

  const togglePresta = (p: string) => setPrestations(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  const getModeles = () => {
    if (appareil === 'smartphone') {
      if (marque === 'Apple (iPhone)') return IPHONES
      if (marque === 'Samsung' && gamme === 'S') return SAMSUNG_S
      if (marque === 'Samsung' && gamme === 'A') return SAMSUNG_A
      return []
    }
    if (appareil === 'pc') {
      if (marque === 'Apple (MacBook)' && gamme === 'Air') return MAC_AIR
      if (marque === 'Apple (MacBook)' && gamme === 'Pro') return MAC_PRO
      return []
    }
    return []
  }

  const getPrestations = () => appareil === 'pc' ? PRESTA_PC : PRESTA_SM

  const submit = async () => {
    if (!coords.nom || !coords.email || !coords.tel) { toast.error('Remplissez tous les champs obligatoires'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'reparation', client_id: clientId || null,
          client_nom: coords.nom, client_email: coords.email, client_tel: coords.tel,
          appareil, marque: marque + (gamme ? ` ${gamme}` : ''), modele, prestations, message: coords.message,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setRef(json.ref); setStep('confirmation')
    } catch (e: any) { toast.error(e.message || 'Erreur') }
    setLoading(false)
  }

  const btnStyle = (sel: boolean) => ({ padding: '10px 16px', borderRadius: '10px', border: sel ? '2px solid var(--primary)' : '1.5px solid var(--border)', fontSize: '13px', fontWeight: sel ? 600 : 500, cursor: 'pointer', transition: 'all .18s', background: sel ? 'var(--light)' : '#fff', color: sel ? 'var(--primary)' : 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' })
  const nextBtn = (label: string, onClick: () => void, disabled = false) => (
    <div style={{ marginTop: '20px' }}>
      <button onClick={onClick} disabled={disabled} className="rbtn" style={{ width: '100%', fontSize: '13.5px', fontWeight: 700, color: '#fff', background: disabled ? '#CBD5E1' : 'var(--primary)', border: 'none', padding: '14px', borderRadius: '12px', cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all .2s', boxShadow: disabled ? 'none' : '0 6px 16px rgba(0,74,173,.22)' }}>
        {label}
      </button>
    </div>
  )
  const backBtn = () => (
    <button onClick={() => {
      if (step === 'modele') { setStep(gamme ? 'gamme_samsung' || 'gamme_mac' as any : 'marque'); return }
      const prev: Record<string, Step> = { marque:'appareil', gamme_samsung:'marque', gamme_mac:'marque', prestations:'modele', coordonnees:'prestations' }
      setStep(prev[step] || 'appareil')
    }} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
      ← Retour
    </button>
  )

  // Progress
  const steps: Step[] = ['appareil','marque','modele','prestations','coordonnees']
  const stepIdx = steps.indexOf(step as Step)

  return (
    <div>
      {/* Progress bar */}
      {step !== 'confirmation' && (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ flex: 1, height: '4px', borderRadius: '99px', background: i <= stepIdx + 1 ? 'var(--primary)' : 'var(--border)', transition: 'background .3s' }} />
          ))}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '28px', boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,.04)' }} className="card-static">

        {/* STEP 1 — Appareil */}
        {step === 'appareil' && (
          <div>
            <div className="fl">Quel appareil souhaitez-vous réparer ?</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {[{v:'smartphone',l:'📱 Smartphone'},{v:'pc',l:'💻 PC Portable / Mac'},{v:'tablette',l:'📟 Tablette'},{v:'autre',l:'🔧 Autre appareil'}].map(a => (
                <button key={a.v} onClick={() => setAppareil(a.v)} style={btnStyle(appareil === a.v)}>{a.l}</button>
              ))}
            </div>
            {nextBtn('Choisir la marque →', () => { if (!appareil) { toast.error('Choisissez un appareil'); return }; setStep('marque') }, !appareil)}
          </div>
        )}

        {/* STEP 2 — Marque */}
        {step === 'marque' && (
          <div>
            {backBtn()}
            <div className="fl">Quelle est la marque ?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {(appareil === 'smartphone'
                ? ['Apple (iPhone)','Samsung','Xiaomi','Oppo','Huawei','Google Pixel','Autre modèle']
                : ['Apple (MacBook)','Dell','HP','Lenovo','Asus','Acer','MSI','Microsoft Surface','Autre']
              ).map(m => (
                <button key={m} onClick={() => setMarque(m)} style={btnStyle(marque === m)}>{m}</button>
              ))}
            </div>
            {nextBtn('Suivant →', () => {
              if (!marque) { toast.error('Choisissez une marque'); return }
              if (marque === 'Samsung') { setStep('gamme_samsung'); return }
              if (marque === 'Apple (MacBook)') { setStep('gamme_mac'); return }
              if (marque === 'Autre modèle' || marque === 'Autre') { setModele('Autre modèle'); setStep('prestations'); return }
              setStep('modele')
            }, !marque)}
          </div>
        )}

        {/* STEP — Gamme Samsung */}
        {step === 'gamme_samsung' && (
          <div>
            {backBtn()}
            <div className="fl">Quelle gamme Samsung ?</div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {['S','A'].map(g => (
                <button key={g} onClick={() => setGamme(g)} style={{ ...btnStyle(gamme === g), flex: 1, justifyContent: 'center', padding: '14px' }}>
                  Gamme {g}
                </button>
              ))}
            </div>
            <button onClick={() => { setModele('Autre modèle Samsung'); setStep('prestations') }} style={{ width: '100%', padding: '11px', border: '1px solid var(--border)', borderRadius: '10px', background: '#fff', color: 'var(--gray)', cursor: 'pointer', fontSize: '13px' }}>
              Autre modèle Samsung
            </button>
            {nextBtn('Choisir le modèle →', () => { if (!gamme) { toast.error('Choisissez une gamme'); return }; setStep('modele') }, !gamme)}
          </div>
        )}

        {/* STEP — Gamme MacBook */}
        {step === 'gamme_mac' && (
          <div>
            {backBtn()}
            <div className="fl">MacBook Air ou MacBook Pro ?</div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {['Air','Pro'].map(g => (
                <button key={g} onClick={() => setGamme(g)} style={{ ...btnStyle(gamme === g), flex: 1, justifyContent: 'center', padding: '14px' }}>
                  MacBook {g}
                </button>
              ))}
            </div>
            <button onClick={() => { setModele('Autre modèle MacBook'); setStep('prestations') }} style={{ width: '100%', padding: '11px', border: '1px solid var(--border)', borderRadius: '10px', background: '#fff', color: 'var(--gray)', cursor: 'pointer', fontSize: '13px' }}>
              Autre modèle MacBook
            </button>
            {nextBtn('Choisir le modèle →', () => { if (!gamme) { toast.error('Choisissez un modèle'); return }; setStep('modele') }, !gamme)}
          </div>
        )}

        {/* STEP 3 — Modèle */}
        {step === 'modele' && (
          <div>
            {backBtn()}
            <div className="fl">Quel modèle précisément ?</div>
            {getModeles().length > 0 ? (
              <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', paddingRight: '4px' }}>
                {getModeles().map(m => (
                  <button key={m} onClick={() => setModele(m)} style={{ ...btnStyle(modele === m), justifyContent: 'flex-start', textAlign: 'left', width: '100%' }}>
                    {modele === m && <span style={{ color: 'var(--primary)' }}>✓ </span>}{m}
                  </button>
                ))}
                <button onClick={() => setModele('Autre modèle')} style={{ ...btnStyle(modele === 'Autre modèle'), justifyContent: 'flex-start', width: '100%' }}>
                  Autre modèle
                </button>
              </div>
            ) : (
              <div style={{ marginBottom: '16px' }}>
                <label className="fl">Précisez le modèle</label>
                <input className="fc" value={modele} onChange={e => setModele(e.target.value)} placeholder="Ex: HP Pavilion 15..." />
              </div>
            )}
            {nextBtn('Choisir les prestations →', () => { if (!modele) { toast.error('Choisissez un modèle'); return }; setStep('prestations') }, !modele)}
          </div>
        )}

        {/* STEP 4 — Prestations */}
        {step === 'prestations' && (
          <div>
            {backBtn()}
            <div className="fl">Quelle(s) prestation(s) souhaitez-vous ?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {getPrestations().map(p => (
                <button key={p} onClick={() => togglePresta(p)} style={{ ...btnStyle(prestations.includes(p)), justifyContent: 'flex-start', width: '100%' }}>
                  {prestations.includes(p) && <span>✓ </span>}{p}
                </button>
              ))}
            </div>
            <div className="fg">
              <label className="fl">Description complémentaire (optionnel)</label>
              <textarea className="fc" value={coords.message} onChange={e => setCoords(c => ({ ...c, message: e.target.value }))} placeholder="Décrivez la panne en détail..." />
            </div>
            {nextBtn('Mes coordonnées →', () => { if (!prestations.length) { toast.error('Choisissez au moins une prestation'); return }; setStep('coordonnees') }, !prestations.length)}
          </div>
        )}

        {/* STEP 5 — Coordonnées */}
        {step === 'coordonnees' && (
          <div>
            {backBtn()}
            <div className="fl">Vos coordonnées</div>
            {/* Récap */}
            <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', fontSize: '12.5px', color: 'var(--secondary)', lineHeight: 2 }}>
              <strong>📱 {appareil}</strong> · {marque} {gamme}<br />
              <strong>🔧 Modèle :</strong> {modele}<br />
              <strong>⚙️ Prestation(s) :</strong> {prestations.join(', ')}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div><label className="fl">Prénom Nom *</label><input className="fc" value={coords.nom} onChange={e => setCoords(c => ({ ...c, nom: e.target.value }))} placeholder="Jean Dupont" /></div>
              <div><label className="fl">Téléphone *</label><input className="fc" type="tel" value={coords.tel} onChange={e => setCoords(c => ({ ...c, tel: e.target.value }))} placeholder="06 00 00 00 00" /></div>
            </div>
            <label className="fl">Email *</label>
            <input className="fc" type="email" value={coords.email} onChange={e => setCoords(c => ({ ...c, email: e.target.value }))} placeholder="jean@email.fr" />
            <button onClick={submit} disabled={loading} className="sbtn">
              {loading ? 'Envoi en cours...' : 'Envoyer ma demande →'}
            </button>
          </div>
        )}

        {/* Confirmation */}
        {step === 'confirmation' && (
          <div style={{ textAlign: 'center', padding: '28px 16px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✅</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '12px' }}>Demande envoyée !</h2>
            <div style={{ background: 'var(--light)', borderRadius: '10px', padding: '10px 16px', display: 'inline-block', marginBottom: '14px', fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
              Référence : {ref}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.8 }}>
              Nous avons bien reçu votre demande de réparation, nous vous contacterons dans un délai de 2h.<br /><br />
              Bien cordialement,
            </p>
            <button onClick={() => { setStep('appareil'); setAppareil(''); setMarque(''); setGamme(''); setModele(''); setPrestations([]); setCoords({ nom: '', email: clientEmail || '', tel: '', message: '' }) }}
              style={{ marginTop: '20px', background: '#0EA66E', color: '#fff', border: 'none', padding: '11px 22px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
              Nouvelle demande
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
