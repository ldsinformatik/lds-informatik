'use client';

import { useState, useEffect, useCallback } from 'react';

/* ══════════════════════════════════
   EMAILJS CONFIG
══════════════════════════════════ */
const EJS = {
  public_key:  'zFd-xKZE3XUM-ClwJ',
  service_id:  'lds_informatik',
  template_id: 'template_kbtdi8i',
};

/* ══════════════════════════════════
   PRODUITS EN VENTE
══════════════════════════════════ */
const PRODUITS = [
  { ico: '📱', name: 'Galaxy S24 Ultra',   desc: '512 Go · Très bon état · Garantie 12 mois. Débloqué tous opérateurs.',           price: '549,90 €' },
  { ico: '💻', name: 'PC Gamer RGB',       desc: 'RTX 4060 · Ryzen 5 · 16 Go RAM · SSD 1 To. Prêt à jouer, livré configuré.',     price: '1 199 €' },
  { ico: '⌨️', name: 'Accessoires Gaming', desc: 'Claviers mécaniques, souris gaming, écrans et périphériques premium.',            link: 'Découvrir →' },
  { ico: '🍎', name: 'MacBook Air M2',     desc: '256 Go SSD · 8 Go RAM · Reconditionné grade A · Garantie 6 mois.',               price: '799 €' },
  { ico: '🖥', name: 'Écran 27" QHD',     desc: '165 Hz · 1 ms · IPS · Compatible G-Sync. Idéal gaming & création.',              price: '289 €' },
  { ico: '📦', name: 'Stock en boutique', desc: 'Venez découvrir notre sélection complète au 145 Avenue Pierre Brossolette, Troyes.', link: 'Nous contacter →' },
];

/* ══════════════════════════════════
   PC CONFIGURATEUR - DONNÉES
══════════════════════════════════ */
type QuestionDef = { key: string; label: string; multi: boolean; opts: string[] };
type UsageDef    = { questions: QuestionDef[] };

const PC_DETAILS: Record<string, UsageDef> = {
  gaming: { questions: [
    { key: 'genres',     label: 'Quel type de jeux ?',               multi: true,  opts: ['FPS / Tir (CS2, Valorant…)', 'RPG / Open World (RDR2, Elden Ring…)', 'Simulation (Flight Sim, iRacing…)', 'MOBA / Stratégie (LoL, AoE…)', 'Streaming / Contenu', 'Tous types de jeux'] },
    { key: 'intensite',  label: 'Quelle intensité graphique ?',       multi: false, opts: ['Jeux récents en ultra', 'Jeux récents en élevé', 'Jeux e-sport / titres légers', 'Les plus récents peu importe'] },
    { key: 'resolution', label: 'Résolution cible ?',                 multi: false, opts: ['1080p (Full HD)', '1440p (2K)', '4K / Ultra HD', 'Multi-écrans'] },
    { key: 'hz',         label: 'Fréquence de rafraîchissement ?',    multi: false, opts: ['60 Hz (standard)', '144 Hz', '165–240 Hz', '360 Hz+'] },
  ]},
  bureautique: { questions: [
    { key: 'logiciels',  label: 'Quels logiciels principalement ?',   multi: true,  opts: ['Suite Office / Google Docs', 'Navigation web & emails', 'Retouche photo (Lightroom, PS)', 'Montage vidéo léger (Premiere, DaVinci)', 'Comptabilité / ERP', 'Visioconférence (Teams, Zoom)'] },
    { key: 'mobilite',   label: 'Quel usage ?',                       multi: false, opts: ['Bureau fixe uniquement', 'Mobile + bureau', 'Principalement mobile'] },
    { key: 'stockage',   label: 'Besoin en stockage ?',               multi: false, opts: ['256 – 512 Go (usage léger)', '1 To (usage courant)', '2 To+ (grandes bibliothèques)'] },
  ]},
  audiovisuel: { questions: [
    { key: 'metier',         label: 'Quelle discipline principale ?', multi: true,  opts: ['Montage vidéo HD / 4K', 'Motion design / After Effects', 'Modélisation 3D (Blender, Maya…)', 'Rendu 3D / VFX', 'Production musicale (DAW)', 'Photo RAW haut volume'] },
    { key: 'resolution_av',  label: 'Résolution de travail ?',        multi: false, opts: ['Full HD (1080p)', '4K', '6K / 8K / RAW'] },
    { key: 'ram_av',         label: 'RAM souhaitée ?',                multi: false, opts: ['32 Go (entrée de gamme pro)', '64 Go (standard pro)', '128 Go+ (workstation)'] },
    { key: 'stockage_av',    label: 'Type de stockage ?',             multi: false, opts: ['NVMe rapide (projets actifs)', 'Large HDD (archives)', 'Les deux (NVMe + HDD)'] },
  ]},
  autre: { questions: [
    { key: 'usage_libre',   label: 'Décrivez votre usage',            multi: true,  opts: ['Navigation & réseaux sociaux', 'Jeux occasionnels', 'Travail à domicile', 'Enseignement / formation', 'Développement / programmation', 'Multimédia (films, musique)'] },
    { key: 'connaissance',  label: 'Niveau technique ?',              multi: false, opts: ['Débutant - je veux quelque chose de simple', 'Intermédiaire', 'Expert - je sais ce que je veux'] },
  ]},
};

const PC_RECO: Record<string, { base: string; note: string }> = {
  gaming:      { base: 'Ryzen 7 / Core i7 · RTX 4070+ · 32 Go RAM · SSD NVMe 1 To',   note: 'Idéal pour jouer en 1440p ou 4K sans compromis.' },
  bureautique: { base: 'Core i5 / Ryzen 5 · iGPU · 16 Go RAM · SSD 512 Go',             note: 'Fiable, silencieux et économe. Parfait pour le quotidien.' },
  audiovisuel: { base: 'Core i9 / Ryzen 9 · RTX 4070 Ti · 64 Go RAM · NVMe 2 To',      note: 'Workstation orientée rendu et montage 4K.' },
  autre:       { base: 'Config sur mesure selon vos réponses',                           note: 'Nous vous proposerons la config la plus adaptée.' },
};

const USAGES = [
  { id: 'gaming',      ico: '🎮', name: 'Gaming',                    sub: 'FPS, RPG, simulation…' },
  { id: 'bureautique', ico: '💼', name: 'Bureautique / Multimédia',  sub: 'Web, Office, photo, vidéo légère' },
  { id: 'audiovisuel', ico: '🎬', name: 'Audiovisuel Pro',           sub: 'Montage 4K, 3D, rendu, DAW' },
  { id: 'autre',       ico: '⚙️', name: 'Autre / Je ne sais pas',   sub: 'On vous guide !' },
];

const STEP_TITLES = ['', 'Quelle est votre utilisation ?', 'Précisez vos besoins', 'Votre budget', 'Vos coordonnées', 'Confirmation'];

/* ══════════════════════════════════
   COMPOSANT PRINCIPAL
══════════════════════════════════ */
export default function AchetezPage() {
  const [activeTab, setActiveTab] = useState<'vente' | 'pc'>('vente');

  /* ── PC state ── */
  const [step, setStep]           = useState(1);
  const [usage, setUsage]         = useState<string | null>(null);
  const [usageName, setUsageName] = useState('');
  const [details, setDetails]     = useState<Record<string, string[]>>({});
  const [budget, setBudget]       = useState(1000);
  const [reutilise, setReutilise] = useState('');
  const [delai, setDelai]         = useState('');
  const [prenom, setPrenom]       = useState('');
  const [nom, setNom]             = useState('');
  const [email, setEmail]         = useState('');
  const [tel, setTel]             = useState('');
  const [desc, setDesc]           = useState('');
  const [pcRef, setPcRef]         = useState('');
  const [sending, setSending]     = useState(false);

  const canStep4 = prenom.trim() && nom.trim() && email.trim() && tel.trim();

  /* ── tab switch ── */
  const switchTab = (t: 'vente' | 'pc') => { setActiveTab(t); };

  /* ── pick usage ── */
  const pickUsage = (id: string, name: string) => {
    setUsage(id); setUsageName(name); setDetails({});
  };

  /* ── detail pick ── */
  const detailPick = (key: string, multi: boolean, val: string) => {
    setDetails(prev => {
      if (multi) {
        const arr = prev[key] || [];
        return { ...prev, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
      }
      return { ...prev, [key]: [val] };
    });
  };

  /* ── go step ── */
  const goStep = (n: number) => { setStep(n); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── confirm ── */
  const pcConfirm = useCallback(async () => {
    setSending(true);
    const ref = 'LDS-PC-' + Math.floor(1000 + Math.random() * 9000);
    setPcRef(ref);
    const reco = PC_RECO[usage || 'autre'] || { base: 'Sur devis' };
    try {
      const key = 'lds_admin_demandes';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.unshift({
        id: ref + '-' + Date.now().toString(36),
        type: 'pc', status: 'nouveau', motif: '',
        nom: prenom + ' ' + nom, email, tel,
        usage: usageName, budget, config_base: reco.base,
        message: desc, notes: '', ref,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) { /* silent */ }
    try {
      const emailjs = (window as any).emailjs;
      if (emailjs) {
        emailjs.init({ publicKey: EJS.public_key });
        await emailjs.send(EJS.service_id, EJS.template_id, {
          to_email: 'contact@ldsinformatik.fr,troyes@ldsinformatik.fr',
          subject: `PC sur mesure : nouvelle demande (${ref})`,
          from_name: `${prenom} ${nom}`,
          client_email: email, client_tel: tel, ref,
          type: 'PC sur mesure',
          details: `Usage : ${usageName}\nBudget : ${budget} €\nConfig : ${reco.base}${desc ? '\nMessage : ' + desc : ''}`,
          admin_url: 'https://lds-informatik.vercel.app/admin/',
        });
      }
    } catch (e) { /* silent */ }
    setSending(false);
    setStep(5);
  }, [prenom, nom, email, tel, usage, usageName, budget, desc]);

  /* ── reset ── */
  const pcReset = () => {
    setStep(1); setUsage(null); setUsageName(''); setDetails({});
    setBudget(1000); setReutilise(''); setDelai('');
    setPrenom(''); setNom(''); setEmail(''); setTel(''); setDesc('');
  };

  /* ══════════════════════════════
     RENDER
  ══════════════════════════════ */
  const reco = usage ? PC_RECO[usage] : null;
  const allDetails = Object.values(details).flat();

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
        body { font-family: 'Inter', sans-serif; color: var(--text); background: var(--bg); }

        /* ── Tabs ── */
        .a-tabs { background: #fff; border-bottom: 1px solid var(--border); padding: 0 16px; display: flex; }
        .atab { background: none; border: none; border-bottom: 3px solid transparent; padding: 16px 22px; font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600; color: var(--gray); cursor: pointer; transition: all .18s; }
        .atab:hover { color: var(--primary); }
        .atab.active { color: var(--primary); border-bottom-color: var(--primary); }

        /* ── Vente section ── */
        .sh { padding: 28px 32px 16px; background: var(--bg); }
        .stag { font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--primary); font-weight: 700; margin-bottom: 8px; }
        .stitle { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 800; color: var(--secondary); }
        .stitle strong { color: var(--primary); }
        .ssub { font-size: 13px; color: var(--gray); margin-top: 5px; }
        .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 18px; padding: 20px 32px 40px; }
        .card { background: #fff; border-radius: 16px; padding: 22px; border: 1px solid var(--border); box-shadow: var(--shadow); transition: transform .2s, box-shadow .2s; cursor: default; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0,74,173,.1); }
        .cicon { font-size: 2rem; margin-bottom: 10px; }
        .cname { font-size: 14px; font-weight: 800; color: var(--secondary); margin-bottom: 6px; }
        .cdesc { font-size: 12.5px; color: var(--gray); line-height: 1.6; }
        .cprice { margin-top: 14px; font-size: 1.3rem; font-weight: 800; color: var(--primary); }
        .clink { margin-top: 14px; font-size: 13px; font-weight: 700; color: var(--primary); cursor: pointer; }
        .clink:hover { opacity: .7; }

        /* ── PC wrap ── */
        .pc-wrap { padding: 28px 32px 48px; }
        .pc-top { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }
        .pc-bk { width: 36px; height: 36px; background: #fff; border: 1px solid var(--border); border-radius: 9px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 15px; transition: all .18s; }
        .pc-bk:hover { border-color: var(--primary); color: var(--primary); }
        .pc-title { font-size: 1.45rem; font-weight: 800; color: var(--text); }
        .pc-title strong { color: var(--primary); }

        /* ── Steps ── */
        .pc-steps { display: flex; align-items: center; margin-bottom: 22px; overflow-x: auto; padding-bottom: 2px; gap: 0; }
        .pcs { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .pcs-d { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; border: 2px solid var(--border); color: var(--gray); background: #fff; transition: all .25s; }
        .pcs.active .pcs-d { background: var(--primary); border-color: var(--primary); color: #fff; }
        .pcs.done .pcs-d { background: var(--green); border-color: var(--green); color: #fff; }
        .pcs-l { font-size: 11px; font-weight: 600; color: var(--gray); white-space: nowrap; }
        .pcs.active .pcs-l { color: var(--primary); }
        .pcs.done .pcs-l { color: var(--green); }
        .pcs-line { flex: 1; height: 2px; background: var(--border); margin: 0 5px; min-width: 10px; }
        .pcs-line.done { background: var(--green); }

        /* ── Layout ── */
        .pc-layout { display: grid; grid-template-columns: 1fr 280px; gap: 20px; align-items: start; }
        .pc-panel { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); padding: 22px; }
        .pc-lbl { display: flex; align-items: center; gap: 7px; font-size: 13.5px; font-weight: 700; color: var(--text); margin-bottom: 16px; }
        .pc-lbl::before { content: ''; width: 7px; height: 7px; background: var(--primary); border-radius: 50%; }

        /* ── Usage grid ── */
        .ug { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .ugc { background: #fff; border: 1.5px solid var(--border); border-radius: 13px; padding: 20px 16px; cursor: pointer; transition: all .2s; user-select: none; text-align: center; }
        .ugc:hover { border-color: var(--primary); background: #f0f6ff; }
        .ugc.sel { border-color: var(--primary); background: var(--light); box-shadow: 0 0 0 3px rgba(0,74,173,.1); }
        .ugc-ico { font-size: 2rem; margin-bottom: 8px; }
        .ugc-nm { font-size: 13px; font-weight: 700; color: var(--secondary); }
        .ugc-sub { font-size: 11px; color: var(--gray); margin-top: 3px; }

        /* ── Question blocks ── */
        .qblock { margin-bottom: 20px; }
        .qlbl { font-size: 13px; font-weight: 700; color: var(--secondary); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
        .qlbl::before { content: ''; width: 5px; height: 5px; background: var(--primary); border-radius: 50%; flex-shrink: 0; }
        .qopts { display: flex; flex-wrap: wrap; gap: 8px; }
        .qopt { background: #fff; border: 1.5px solid var(--border); border-radius: 8px; padding: 8px 14px; font-size: 12.5px; font-weight: 500; color: var(--secondary); cursor: pointer; transition: all .18s; user-select: none; }
        .qopt:hover { border-color: var(--primary); color: var(--primary); }
        .qopt.sel { background: var(--primary); border-color: var(--primary); color: #fff; }

        /* ── Budget ── */
        input[type=range] { width: 100%; accent-color: var(--primary); cursor: pointer; }

        /* ── Form fields ── */
        .fl { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--primary); display: block; margin-bottom: 6px; font-weight: 600; }
        .fc { width: 100%; background: var(--bg); border: 1px solid var(--border); color: var(--text); font-family: 'Inter', sans-serif; font-size: 13px; padding: 10px 13px; border-radius: 10px; outline: none; transition: border-color .18s; }
        .fc:focus { border-color: var(--primary); background: #fff; }
        .fc::placeholder { color: var(--gray); }
        textarea.fc { height: 76px; resize: none; }

        /* ── Buttons ── */
        .rbtn { background: var(--primary); color: #fff; border: none; padding: 13px 26px; border-radius: 13px; font-size: 13.5px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 20px rgba(0,74,173,.22); transition: all .2s; }
        .rbtn:hover { background: var(--secondary); transform: translateY(-1px); }
        .rbtn:disabled { opacity: .4; cursor: not-allowed; transform: none; }
        .pc-rbottom { display: flex; justify-content: flex-end; margin-top: 18px; }

        /* ── Recap sidebar ── */
        .pc-sum { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); padding: 18px; position: sticky; top: 76px; }
        .pc-sum h3 { font-size: .95rem; font-weight: 800; color: var(--text); margin-bottom: 14px; }
        .psum-row { background: var(--bg); border-radius: 7px; padding: 9px 12px; font-size: 12px; color: var(--secondary); font-weight: 600; margin-bottom: 7px; }
        .psum-tag { font-size: 10px; color: var(--gray); font-weight: 400; display: block; margin-bottom: 1px; }
        .psum-empty { font-size: 12px; color: var(--gray); font-style: italic; text-align: center; padding: 14px 0; }
        .psum-div { height: 1px; background: var(--border); margin: 12px 0; }
        .psum-reco { font-size: 11.5px; color: var(--gray); line-height: 1.6; font-style: italic; }

        /* ── Success ── */
        .pc-ok { text-align: center; padding: 36px 16px; }
        .pc-ok-ico { font-size: 3rem; margin-bottom: 12px; }
        .pc-ok h2 { font-size: 1.4rem; font-weight: 800; color: var(--secondary); margin-bottom: 8px; }
        .pc-ok p { font-size: 13.5px; color: var(--gray); max-width: 360px; margin: 0 auto 18px; line-height: 1.7; }
        .pc-ok-ref { background: var(--light); border-radius: 9px; padding: 9px 16px; display: inline-block; font-size: 12.5px; font-weight: 700; color: var(--primary); margin-bottom: 18px; }
        .pc-sum-final { text-align: left; background: var(--bg); border-radius: 10px; padding: 14px 18px; margin-bottom: 18px; font-size: 12.5px; color: var(--secondary); line-height: 2; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cards { grid-template-columns: repeat(2, 1fr); padding: 14px 14px 30px; }
          .sh { padding: 20px 14px 10px; }
          .pc-wrap { padding: 16px 12px 32px; }
          .pc-layout { grid-template-columns: 1fr; }
          .pc-sum { position: static; }
          .ug { grid-template-columns: 1fr 1fr; }
          .ugc { padding: 14px 8px; }
          .ugc-ico { font-size: 1.5rem; margin-bottom: 6px; }
          .ugc-nm { font-size: 12px; }
          .pcs-l { display: none; }
          .pc-rbottom { justify-content: stretch; }
          .pc-rbottom .rbtn { width: 100%; }
        }
        @media (max-width: 560px) {
          .cards { grid-template-columns: 1fr; }
          .ug { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* TABS */}
      <div className="a-tabs">
        <button className={`atab${activeTab === 'vente' ? ' active' : ''}`} onClick={() => switchTab('vente')}>🛒 Produits en vente</button>
        <button className={`atab${activeTab === 'pc' ? ' active' : ''}`} onClick={() => switchTab('pc')}>🖥 PC sur mesure</button>
      </div>

      {/* ════════════════ PANEL VENTE ════════════════ */}
      {activeTab === 'vente' && (
        <>
          <div className="sh">
            <div className="stag">Nos produits en vente</div>
            <div className="stitle">Découvrez notre catalogue de produits <strong>garanties</strong> &amp; sélectionnés avec soin</div>
            <div className="ssub">Smartphones · PC · Accessoires · Reconditionné</div>
          </div>
          <div className="cards">
            {PRODUITS.map((p, i) => (
              <div key={i} className="card">
                <div className="cicon">{p.ico}</div>
                <div className="cname">{p.name}</div>
                <p className="cdesc">{p.desc}</p>
                {p.price && <div className="cprice">{p.price}</div>}
                {p.link && <div className="clink">{p.link}</div>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ════════════════ PANEL PC ════════════════ */}
      {activeTab === 'pc' && (
        <div className="pc-wrap">
          {/* Top bar */}
          <div className="pc-top">
            {step > 1 && step < 5 && (
              <button className="pc-bk" onClick={() => setStep(s => s - 1)}>←</button>
            )}
            <div className="pc-title">
              {step === 1 && <>Quelle est votre <strong>utilisation</strong> ?</>}
              {step === 2 && <>Précisez vos <strong>besoins</strong></>}
              {step === 3 && <>Votre <strong>budget</strong></>}
              {step === 4 && <>Vos <strong>coordonnées</strong></>}
              {step === 5 && <><strong>Confirmation</strong></>}
            </div>
          </div>

          {/* Steps indicator */}
          <div className="pc-steps">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <div key={n} style={{ display: 'contents' }}>
                <div className={`pcs${step === n ? ' active' : step > n ? ' done' : ''}`}>
                  <div className="pcs-d">{step > n ? '✓' : n}</div>
                  <div className="pcs-l">{STEP_TITLES[n]}</div>
                </div>
                {i < 4 && (
                  <div className={`pcs-line${step > n ? ' done' : ''}`} />
                )}
              </div>
            ))}
          </div>

          {/* Content + Sidebar */}
          <div className="pc-layout">
            <div>

              {/* ── STEP 1 — Usage ── */}
              {step === 1 && (
                <div>
                  <div className="pc-panel">
                    <div className="pc-lbl">Sélectionnez votre utilisation principale</div>
                    <div className="ug">
                      {USAGES.map(u => (
                        <div key={u.id} className={`ugc${usage === u.id ? ' sel' : ''}`} onClick={() => pickUsage(u.id, u.name)}>
                          <div className="ugc-ico">{u.ico}</div>
                          <div className="ugc-nm">{u.name}</div>
                          <div className="ugc-sub">{u.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pc-rbottom">
                    <button className="rbtn" disabled={!usage} onClick={() => goStep(2)}>Préciser mes besoins →</button>
                  </div>
                </div>
              )}

              {/* ── STEP 2 — Détails ── */}
              {step === 2 && (
                <div>
                  <div className="pc-panel">
                    <div className="pc-lbl">Précisez vos besoins</div>
                    {usage && PC_DETAILS[usage]?.questions.map(q => (
                      <div key={q.key} className="qblock">
                        <div className="qlbl">{q.label}</div>
                        <div className="qopts">
                          {q.opts.map(o => (
                            <div key={o}
                              className={`qopt${(details[q.key] || []).includes(o) ? ' sel' : ''}`}
                              onClick={() => detailPick(q.key, q.multi, o)}>{o}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pc-rbottom">
                    <button className="rbtn" onClick={() => goStep(3)}>Mon budget →</button>
                  </div>
                </div>
              )}

              {/* ── STEP 3 — Budget ── */}
              {step === 3 && (
                <div>
                  <div className="pc-panel">
                    <div className="pc-lbl">Quel est votre budget indicatif ?</div>
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--gray)', marginBottom: 8 }}>
                        <span>500 €</span><span>3 000 €+</span>
                      </div>
                      <input type="range" min="500" max="3000" step="100" value={budget}
                        onChange={e => setBudget(parseInt(e.target.value))} />
                      <div style={{ textAlign: 'center', marginTop: 10 }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                          {budget.toLocaleString('fr-FR')} €
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--gray)', marginLeft: 4 }}>budget estimé</span>
                      </div>
                    </div>

                    <div className="qblock" style={{ marginTop: 16 }}>
                      <div className="qlbl">Avez-vous du matériel à réutiliser ?</div>
                      <div className="qopts">
                        {['Oui, écran + périphériques', 'Oui, écran seulement', 'Non, tout à acheter'].map(v => (
                          <div key={v} className={`qopt${reutilise === v ? ' sel' : ''}`}
                            onClick={() => setReutilise(v)}>{v}</div>
                        ))}
                      </div>
                    </div>

                    <div className="qblock">
                      <div className="qlbl">Délai souhaité</div>
                      <div className="qopts">
                        {['Dès que possible', 'Dans le mois', 'Pas de contrainte'].map(v => (
                          <div key={v} className={`qopt${delai === v ? ' sel' : ''}`}
                            onClick={() => setDelai(v)}>{v}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pc-rbottom">
                    <button className="rbtn" onClick={() => goStep(4)}>Mes coordonnées →</button>
                  </div>
                </div>
              )}

              {/* ── STEP 4 — Coordonnées ── */}
              {step === 4 && (
                <div>
                  <div className="pc-panel">
                    <div className="pc-lbl">Vos coordonnées</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div><label className="fl">Prénom *</label><input className="fc" type="text" placeholder="Jean" value={prenom} onChange={e => setPrenom(e.target.value)} /></div>
                      <div><label className="fl">Nom *</label><input className="fc" type="text" placeholder="Dupont" value={nom} onChange={e => setNom(e.target.value)} /></div>
                    </div>
                    <div style={{ marginTop: 12 }}><label className="fl">Email *</label><input className="fc" type="email" placeholder="jean@email.fr" value={email} onChange={e => setEmail(e.target.value)} /></div>
                    <div style={{ marginTop: 12 }}><label className="fl">Téléphone *</label><input className="fc" type="tel" placeholder="06 00 00 00 00" value={tel} onChange={e => setTel(e.target.value)} /></div>
                    <div style={{ marginTop: 12 }}>
                      <label className="fl">Précisions supplémentaires</label>
                      <textarea className="fc" placeholder="Logiciels spécifiques, contraintes particulières…" value={desc} onChange={e => setDesc(e.target.value)} />
                    </div>
                  </div>
                  <div className="pc-rbottom">
                    <button className="rbtn" disabled={!canStep4 || sending} onClick={pcConfirm}>
                      {sending ? 'Envoi en cours…' : 'Envoyer ma demande →'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 5 — Confirmation ── */}
              {step === 5 && (
                <div className="pc-panel">
                  <div className="pc-ok">
                    <div className="pc-ok-ico">✅</div>
                    <h2>Demande envoyée !</h2>
                    <p>Nous avons bien reçu votre demande de PC sur mesure, nous vous contacterons dans un délai de 2h.<br /><br />Bien cordialement,</p>
                    <div className="pc-ok-ref">Référence : {pcRef}</div>
                    <div className="pc-sum-final">
                      <strong>Utilisation :</strong> {usageName}<br />
                      <strong>Budget :</strong> {budget.toLocaleString('fr-FR')} €<br />
                      <strong>Config base :</strong> {PC_RECO[usage || 'autre']?.base}<br />
                      <strong>Contact :</strong> {prenom} · {email} · {tel}
                    </div>
                    <button className="rbtn" style={{ background: 'var(--green)' }} onClick={pcReset}>Nouvelle demande</button>
                  </div>
                </div>
              )}

            </div>

            {/* ── SIDEBAR RECAP ── */}
            <div className="pc-sum">
              <h3>Votre configuration</h3>
              {usageName ? (
                <div className="psum-row"><span className="psum-tag">Utilisation</span>{usageName}</div>
              ) : (
                <div className="psum-empty">Aucune utilisation sélectionnée</div>
              )}
              {budget && (
                <div className="psum-row"><span className="psum-tag">Budget</span>{budget.toLocaleString('fr-FR')} €</div>
              )}
              {allDetails.length > 0 && (
                <div className="psum-row">
                  <span className="psum-tag">Besoins clés</span>
                  {allDetails.slice(0, 3).join(' · ')}{allDetails.length > 3 ? ' …' : ''}
                </div>
              )}
              <div className="psum-div" />
              <div className="psum-reco">
                {reco ? (
                  <>
                    <strong style={{ color: 'var(--secondary)' }}>Config recommandée :</strong><br />
                    {reco.base}<br />
                    <span style={{ color: 'var(--green)' }}>✓ {reco.note}</span>
                  </>
                ) : (
                  'Répondez aux questions pour voir une recommandation.'
                )}
              </div>
              <p style={{ fontSize: 10.5, color: 'var(--gray)', marginTop: 10, lineHeight: 1.5 }}>
                💡 Devis gratuit sous 24h. Vous ne payez qu'à la livraison.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
