'use client';

import { useState, useRef } from 'react';

/* ══════════════════════════════════
   EMAILJS CONFIG
══════════════════════════════════ */
const EJS = {
  public_key:  'zFd-xKZE3XUM-ClwJ',
  service_id:  'lds_informatik',
  template_id: 'template_kbtdi8i',
};

/* ══════════════════════════════════
   PRESTATIONS DATA
══════════════════════════════════ */
const PRESTATIONS = [
  {
    ico: '🖥',
    title: 'Gestion & Maintenance du parc',
    desc: 'Inventaire, mises à jour, patches de sécurité et supervision proactive de tous vos équipements (PC, serveurs, imprimantes). Interventions préventives planifiées pour éviter les pannes.',
    tags: ['Maintenance préventive', 'Mises à jour', 'Supervision'],
  },
  {
    ico: '🎧',
    title: 'Support & Assistance utilisateurs',
    desc: 'Hotline téléphonique et prise en main à distance pour résoudre rapidement les incidents du quotidien. Intervention sur site disponible selon contrat. SLA défini selon vos besoins.',
    tags: ['Helpdesk', 'Télémaintenance', 'Sur site'],
  },
  {
    ico: '☁️',
    title: 'Microsoft 365 & Google Workspace',
    desc: 'Déploiement, migration, administration et formation sur Microsoft 365 (Teams, Exchange, SharePoint) ou Google Workspace. Gestion des licences et des comptes utilisateurs.',
    tags: ['Microsoft 365', 'Google Workspace', 'Migration', 'Formation'],
  },
  {
    ico: '🔐',
    title: 'Cybersécurité & Protection',
    desc: "Antivirus / EDR managé nouvelle génération, filtrage web, protection des emails, sensibilisation des utilisateurs aux menaces (phishing, ransomware). Audit de sécurité disponible.",
    tags: ['EDR', 'Anti-phishing', 'Audit', 'Formation'],
  },
  {
    ico: '💾',
    title: "Sauvegarde & Plan de reprise",
    desc: "Sauvegarde automatique quotidienne de vos données (cloud + local). Plan de Reprise d'Activité (PRA) et Plan de Continuité (PCA) pour garantir la disponibilité de votre SI.",
    tags: ['Sauvegarde cloud', 'PRA / PCA', 'Restauration'],
  },
  {
    ico: '🌐',
    title: 'Réseau, Wi-Fi & Téléphonie IP',
    desc: 'Installation et administration de votre infrastructure réseau (switches, firewalls, Wi-Fi professionnel). Déploiement de la téléphonie IP (VoIP) avec numéros fixes et softphones.',
    tags: ['Réseau LAN/WAN', 'Wi-Fi pro', 'VoIP', 'Firewall'],
  },
  {
    ico: '🏢',
    title: 'Hébergement & Cloud souverain',
    desc: 'Hébergement de vos applications et données sur des serveurs européens conformes RGPD. Virtualisation, serveurs dédiés ou cloud hybride selon vos besoins de performance et budget.',
    tags: ['Cloud Europe', 'RGPD', 'Virtualisation', 'Serveurs dédiés'],
  },
  {
    ico: '🤝',
    title: 'DSI externalisé (vCIO)',
    desc: 'Un directeur informatique virtuel dédié à votre structure. Conseil stratégique, gestion des prestataires, budgétisation IT, projets de transformation numérique - sans les coûts d\'un salarié senior.',
    tags: ['Conseil IT', 'Stratégie', 'Projets numériques'],
  },
];

interface IgData {
  prestataire: string;
  sauvegarde: string;
  m365: string;
  besoins: string[];
}

export default function InfogerancePage() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [postes, setPostes] = useState('');
  const [msg, setMsg] = useState('');
  const [igData, setIgData] = useState<IgData>({ prestataire: '', sauvegarde: '', m365: '', besoins: [] });
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const canSubmit = !!(prenom.trim() && nom.trim() && entreprise.trim() && email.trim() && tel.trim() && postes !== '');

  const igSingle = (key: keyof IgData, val: string) => {
    setIgData(prev => ({ ...prev, [key]: val }));
  };

  const igMulti = (val: string) => {
    setIgData(prev => {
      const besoins = prev.besoins.includes(val)
        ? prev.besoins.filter(x => x !== val)
        : [...prev.besoins, val];
      return { ...prev, besoins };
    });
  };

  const igSubmit = async () => {
    setSending(true);
    const ref = 'LDS-IG-' + Math.floor(1000 + Math.random() * 9000);
    try {
      const key = 'lds_admin_demandes';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.unshift({
        id: ref + '-' + Date.now().toString(36),
        type: 'infogerance', status: 'nouveau', motif: '',
        nom: prenom + ' ' + nom, email, tel,
        entreprise, nb_postes: postes,
        prestataire: igData.prestataire, m365: igData.m365,
        besoins: igData.besoins,
        message: msg, notes: '', ref,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) { /* silent */ }
    try {
      const emailjs = (window as any).emailjs;
      if (emailjs && EJS.public_key !== 'VOTRE_PUBLIC_KEY') {
        emailjs.init({ publicKey: EJS.public_key });
        await emailjs.send(EJS.service_id, EJS.template_id, {
          to_email: 'contact@ldsinformatik.fr,troyes@ldsinformatik.fr',
          subject: `Infogérance : nouvelle demande d'audit (${ref})`,
          from_name: `${prenom} ${nom}`,
          client_email: email, client_tel: tel, ref,
          type: 'Infogérance',
          details:
            `Entreprise : ${entreprise}\nNb postes : ${postes}\n` +
            `Prestataire actuel : ${igData.prestataire || 'Non renseigné'}\n` +
            `Besoins : ${igData.besoins.join(', ') || 'Non renseigné'}` +
            (msg ? `\nMessage : ${msg}` : ''),
          admin_url: 'https://lds-informatik.vercel.app/admin/',
        });
      }
    } catch (e) { /* silent */ }
    setSending(false);
    setSuccess(true);
  };

  const igReset = () => {
    setPrenom(''); setNom(''); setEntreprise('');
    setEmail(''); setTel(''); setPostes(''); setMsg('');
    setIgData({ prestataire: '', sauvegarde: '', m365: '', besoins: [] });
    setSuccess(false);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <style>{`
        :root {
          --primary: #004AAD; --secondary: #162a68; --light: #d8e9ff;
          --white: #fff; --text: #1a1a1a; --gray: #6b7280;
          --border: #e5e7eb; --bg: #f7faff;
          --shadow: 0 10px 30px rgba(0,0,0,0.07); --radius: 20px; --green: #0EA66E;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; color: var(--text); background: var(--bg); line-height: 1.6; }
        .sh { padding: 40px 32px 24px; background: #fff; border-bottom: 1px solid var(--border); }
        .stag { font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--primary); font-weight: 700; margin-bottom: 8px; }
        .stitle { font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; color: var(--secondary); }
        .stitle strong { color: var(--primary); }
        .ssub { font-size: 13.5px; color: var(--gray); margin-top: 6px; }
        .ig-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; padding: 28px 32px; align-items: start; }
        .ig-left p { font-size: 13.5px; color: var(--gray); line-height: 1.75; margin-bottom: 16px; }
        .ig-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,74,173,.08); color: var(--primary); padding: 8px 16px; border-radius: 999px; font-size: 12.5px; font-weight: 600; margin-bottom: 20px; }
        .ig-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .ig-stat { background: #fff; border-radius: 14px; padding: 16px; box-shadow: var(--shadow); border-top: 3px solid var(--primary); }
        .ig-stat-num { font-size: 1.6rem; font-weight: 800; color: var(--primary); }
        .ig-stat-lbl { font-size: 12px; color: var(--gray); margin-top: 4px; }
        .ig-price-box { background: linear-gradient(135deg, #004AAD 0%, #162a68 100%); border-radius: 16px; padding: 20px 24px; margin-bottom: 24px; color: #fff; }
        .ig-price-box .price-label { font-size: 11px; text-transform: uppercase; letter-spacing: .1em; opacity: .7; margin-bottom: 6px; }
        .ig-price-box .price-value { font-size: 2rem; font-weight: 800; }
        .ig-price-box .price-sub { font-size: 12.5px; opacity: .8; margin-top: 6px; line-height: 1.5; }
        .ig-prests { display: grid; gap: 14px; margin-bottom: 28px; }
        .ig-prest-card { background: #fff; border-radius: 14px; padding: 18px 20px; border: 1px solid var(--border); box-shadow: var(--shadow); transition: transform .2s, box-shadow .2s; }
        .ig-prest-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,74,173,.1); }
        .ig-prest-head { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .ig-prest-ico { width: 40px; height: 40px; background: var(--light); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .ig-prest-title { font-size: 14px; font-weight: 700; color: var(--secondary); }
        .ig-prest-desc { font-size: 13px; color: var(--gray); line-height: 1.65; margin-bottom: 10px; }
        .ig-prest-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .ig-prest-tag { font-size: 10.5px; font-weight: 600; color: var(--primary); background: var(--light); padding: 3px 9px; border-radius: 20px; }
        .ig-form-box { background: #fff; border-radius: var(--radius); padding: 28px; box-shadow: var(--shadow); position: sticky; top: 76px; }
        .ig-form-tag { font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--primary); font-weight: 700; margin-bottom: 18px; display: block; }
        .ig-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .fl { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--primary); display: block; margin-bottom: 6px; font-weight: 600; }
        .fc { width: 100%; background: var(--bg); border: 1px solid var(--border); color: var(--text); font-family: 'Inter', sans-serif; font-size: 13px; padding: 10px 13px; border-radius: 10px; outline: none; transition: border-color .18s; margin-bottom: 14px; }
        .fc:focus { border-color: var(--primary); background: #fff; }
        .fc::placeholder { color: var(--gray); }
        textarea.fc { height: 72px; resize: none; }
        .qopts { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .qopt { background: #fff; border: 1.5px solid var(--border); border-radius: 8px; padding: 8px 14px; font-size: 12.5px; font-weight: 500; color: var(--secondary); cursor: pointer; transition: all .18s; user-select: none; }
        .qopt:hover { border-color: var(--primary); color: var(--primary); }
        .qopt.sel { background: var(--primary); border-color: var(--primary); color: #fff; }
        .sbtn { width: 100%; font-size: 13.5px; font-weight: 700; color: #fff; background: var(--primary); border: none; padding: 13px; border-radius: 12px; cursor: pointer; transition: all .2s; box-shadow: 0 6px 16px rgba(0,74,173,.22); }
        .sbtn:hover { background: var(--secondary); transform: translateY(-1px); }
        .sbtn:disabled { opacity: .4; cursor: not-allowed; transform: none; }
        .ig-success { text-align: center; padding: 28px 16px; }
        .ig-success-ico { font-size: 2.5rem; margin-bottom: 10px; }
        .ig-success h3 { font-size: 1.1rem; font-weight: 800; color: var(--secondary); margin-bottom: 12px; }
        .ig-success p { font-size: 13px; color: var(--gray); margin-bottom: 18px; line-height: 1.8; }
        .btn-s { display: inline-flex; align-items: center; justify-content: center; font-size: 12.5px; font-weight: 600; color: var(--secondary); background: #fff; border: 1px solid var(--border); padding: 10px 20px; border-radius: 12px; cursor: pointer; transition: all .2s; }
        .btn-s:hover { border-color: var(--primary); color: var(--primary); }
        .urg-box { margin-top: 20px; background: rgba(14,166,110,.12); border: .5px solid rgba(14,166,110,.3); border-radius: 10px; padding: 12px 16px; display: flex; align-items: center; gap: 10px; }
        .urg-dot { width: 7px; height: 7px; background: #0EA66E; border-radius: 50%; flex-shrink: 0; animation: bl 1.5s infinite; }
        @keyframes bl { 0%,100%{opacity:1} 50%{opacity:.2} }
        .urg-t { font-size: 12px; color: var(--gray); }
        .urg-t strong { color: #0EA66E; }
        .ig-cta-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--primary); color: #fff; border: none; padding: 13px 26px; border-radius: 13px; font-size: 13.5px; font-weight: 600; cursor: pointer; box-shadow: 0 8px 20px rgba(0,74,173,.22); transition: all .2s; margin-bottom: 24px; }
        .ig-cta-btn:hover { background: var(--secondary); transform: translateY(-2px); }
        @media (max-width: 900px) {
          .ig-layout { grid-template-columns: 1fr; padding: 16px 12px; }
          .ig-form-box { position: static; }
          .ig-form-row { grid-template-columns: 1fr; }
          .sh { padding: 22px 16px 14px; }
        }
      `}</style>

      {/* HEADER */}
      <div className="sh">
        <div className="stag">Solutions professionnelles</div>
        <div className="stitle">Infogérance & accompagnement <strong>IT</strong></div>
        <div className="ssub">TPE · PME · Professions libérales · Associations</div>
      </div>

      {/* LAYOUT */}
      <div className="ig-layout">

        {/* LEFT */}
        <div className="ig-left">
          <div className="ig-badge">💼 Votre DSI externalisé</div>

          <p>LDS INFORMATIK accompagne les petites entreprises dans la gestion et la sécurisation de leur informatique. Une approche flexible, moderne et adaptée aux petites structures.</p>
          <p>Nous ne sommes pas un simple prestataire - nous sommes votre <strong>partenaire de confiance</strong>, disponible et réactif au quotidien.</p>

          {/* Prix */}
          <div className="ig-price-box">
            <div className="price-label">Tarif indicatif</div>
            <div className="price-value">
              À partir de 35 €{' '}
              <span style={{ fontSize: '1rem', fontWeight: 400, opacity: .8 }}>HT / mois / poste</span>
            </div>
            <div className="price-sub">
              Devis personnalisé gratuit sous 24h · Contrat sans engagement minimum<br />
              Tarif dégressif selon nombre de postes et services inclus
            </div>
          </div>

          {/* Stats */}
          <div className="ig-stats">
            <div className="ig-stat">
              <div className="ig-stat-num">~ 2h</div>
              <div className="ig-stat-lbl">Délai d&apos;intervention moyen</div>
            </div>
            <div className="ig-stat">
              <div className="ig-stat-num">99,9 %</div>
              <div className="ig-stat-lbl">Taux de satisfaction</div>
            </div>
          </div>

          <button className="ig-cta-btn" onClick={scrollToForm}>
            Demander un devis gratuit →
          </button>

          {/* Prestations */}
          <div style={{ marginBottom: 8 }}>
            <div className="stag">Nos prestations</div>
            <div className="stitle" style={{ marginBottom: 20 }}>
              Ce que nous <strong>gérons</strong> pour vous
            </div>
          </div>

          <div className="ig-prests">
            {PRESTATIONS.map((p, i) => (
              <div key={i} className="ig-prest-card">
                <div className="ig-prest-head">
                  <div className="ig-prest-ico">{p.ico}</div>
                  <div className="ig-prest-title">{p.title}</div>
                </div>
                <div className="ig-prest-desc">{p.desc}</div>
                <div className="ig-prest-tags">
                  {p.tags.map(tag => (
                    <span key={tag} className="ig-prest-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="urg-box">
            <div className="urg-dot" />
            <div className="urg-t"><strong>Urgence ?</strong> Hotline disponible 6j/7 — réponse sous 1h</div>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div ref={formRef}>
          <div className="ig-form-box">
            {success ? (
              <div className="ig-success">
                <div className="ig-success-ico">✅</div>
                <h3>Demande envoyée !</h3>
                <p>Nous avons bien reçu votre demande, nous vous contacterons dans un délai de 2h.<br /><br />Bien cordialement,</p>
                <button className="btn-s" onClick={igReset}>Nouvelle demande</button>
              </div>
            ) : (
              <>
                <span className="ig-form-tag">Échangeons sur vos besoins informatiques</span>

                <div className="ig-form-row">
                  <div><label className="fl">Prénom *</label><input className="fc" type="text" placeholder="Jean" value={prenom} onChange={e => setPrenom(e.target.value)} /></div>
                  <div><label className="fl">Nom *</label><input className="fc" type="text" placeholder="Dupont" value={nom} onChange={e => setNom(e.target.value)} /></div>
                </div>

                <label className="fl">Entreprise *</label>
                <input className="fc" type="text" placeholder="Ma société" value={entreprise} onChange={e => setEntreprise(e.target.value)} />

                <div className="ig-form-row">
                  <div><label className="fl">Email *</label><input className="fc" type="email" placeholder="jean@société.fr" value={email} onChange={e => setEmail(e.target.value)} /></div>
                  <div><label className="fl">Téléphone *</label><input className="fc" type="tel" placeholder="06 00 00 00 00" value={tel} onChange={e => setTel(e.target.value)} /></div>
                </div>

                <label className="fl">Nombre de postes *</label>
                <select className="fc" value={postes} onChange={e => setPostes(e.target.value)}>
                  <option value="">Sélectionner…</option>
                  <option>1 – 3 postes</option>
                  <option>4 – 10 postes</option>
                  <option>11 – 25 postes</option>
                  <option>26 – 50 postes</option>
                  <option>50+ postes</option>
                </select>

                <label className="fl">Avez-vous déjà un prestataire informatique ?</label>
                <div className="qopts">
                  {['Oui', 'Non', 'Gestion interne'].map(v => (
                    <div key={v} className={`qopt${igData.prestataire === v ? ' sel' : ''}`} onClick={() => igSingle('prestataire', v)}>{v}</div>
                  ))}
                </div>

                <label className="fl">Avez-vous une solution de sauvegarde ?</label>
                <div className="qopts">
                  {['Oui, cloud', 'Oui, locale', 'Non', 'Je ne sais pas'].map(v => (
                    <div key={v} className={`qopt${igData.sauvegarde === v ? ' sel' : ''}`} onClick={() => igSingle('sauvegarde', v)}>{v}</div>
                  ))}
                </div>

                <label className="fl">Utilisez-vous Microsoft 365 / Google Workspace ?</label>
                <div className="qopts">
                  {['Microsoft 365', 'Google Workspace', 'Messagerie locale', 'Aucun'].map(v => (
                    <div key={v} className={`qopt${igData.m365 === v ? ' sel' : ''}`} onClick={() => igSingle('m365', v)}>{v}</div>
                  ))}
                </div>

                <label className="fl">Vos besoins prioritaires</label>
                <div className="qopts">
                  {[
                    ['🔐 Cybersécurité', 'Cybersécurité'],
                    ['☁️ Sauvegarde', 'Sauvegarde'],
                    ['🔧 Maintenance', 'Maintenance'],
                    ['📧 Messagerie pro', 'Messagerie pro'],
                    ['🌐 Réseau / Wi-Fi', 'Réseau / Wi-Fi'],
                    ['🎧 Support utilisateurs', 'Support utilisateurs'],
                  ].map(([label, val]) => (
                    <div key={val} className={`qopt${igData.besoins.includes(val) ? ' sel' : ''}`} onClick={() => igMulti(val)}>{label}</div>
                  ))}
                </div>

                <label className="fl">Message complémentaire</label>
                <textarea className="fc" placeholder="Décrivez votre contexte ou vos contraintes…" value={msg} onChange={e => setMsg(e.target.value)} />

                <button className="sbtn" disabled={!canSubmit || sending} onClick={igSubmit}>
                  {sending ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
