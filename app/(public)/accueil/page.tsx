import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LDS INFORMATIK — Réparation & Services IT à Troyes',
  description: 'Réparation PC, Mac, smartphones à Troyes. PC sur mesure, vente matériel, infogérance TPE/PME. Diagnostic gratuit, garantie 3 ans. Sans rendez-vous.',
  alternates: { canonical: '/accueil' },
}

export default function AccueilPage() {
  const AVIS = [
    {nom:'Stacy Compan',date:'il y a un mois',texte:"Je remercie infiniment le gérant qui a pu trouver le souci sur mon Mac. Le gérant est fort sympathique et surtout très professionnel et à l'écoute."},
    {nom:'Wesley Maestro',date:'il y a un an',texte:"Intervention rapide les prix sont top, vous pouvez y aller les yeux fermés, il répondra à vos attentes et vous donnera les conseils pour vos besoins."},
    {nom:'Sofiane',date:'il y a un mois',texte:"Réponse très rapide. Rdv proposé le lendemain et réparation effectuée dans la même journée. Je recommande pour la rapidité et le sérieux du travail."},
    {nom:'Angel Jimenez',date:'il y a un an',texte:"Merci Ludovic pour la réparation rapide et efficace pour réinstaller Windows sur mon notebook. On fera appel à vous à la prochaine occasion."},
    {nom:'Jérome Toutof',date:'il y a un mois',texte:"J'ai fait l'acquisition d'un iPad pour ma sœur. Elle est très satisfaite ! Évidemment je reviendrais pour d'autres achats. Merci pour le professionnalisme !"},
    {nom:'El Habib Fessla',date:'il y a un mois',texte:"Achat d'un ordinateur chez LDS à un très bon prix et surtout service client rapide et efficace."},
  ]

  const SERVICES = [
    {href:'/reparer',badge:'Sans RDV',ico:'🛠',name:'Réparation',desc:'PC, Mac, smartphones, tablettes. Diagnostic soigné, pièces certifiées, garantie 3 ans*. Toutes marques.',link:'Voir les détails →'},
    {href:'/acheter',badge:'',ico:'🖥',name:'PC sur mesure',desc:'Configurations gaming, bureautique ou pro conçues selon vos besoins et votre budget.',link:'Configurer mon PC →'},
    {href:'/acheter',badge:'',ico:'🛒',name:'Vente',desc:'Smartphones, PC, accessoires et matériel sélectionnés avec garantie constructeur.',link:'Voir les produits →'},
    {href:'/infogerance',badge:'Forfait mensuel',ico:'🏢',name:'Infogérance',desc:'Accompagnement IT des TPE/PME : Microsoft 365, sécurité, maintenance et support.',link:'Voir les offres →'},
  ]

  const POURQUOI = [
    {ico:'💰',title:'Tarifs fixes sans mauvaise surprise',desc:'Devis gratuit avant toute intervention. Vous savez exactement ce que vous payez, sans frais cachés.'},
    {ico:'🤝',title:'Interlocuteur dédié',desc:'Un accompagnement 100% personnalisé avec un expert qui vous connaît et qui suit votre dossier.'},
    {ico:'💳',title:'Paiement en plusieurs fois',desc:'Dès 100€, réglez en plusieurs fois par CB pour vos achats et réparations.'},
    {ico:'🛡️',title:"Jusqu'à 3 ans de garantie",desc:'Pour des achats et des réparations en toute sérénité.'},
  ]

  const FAQ = [
    {q:'Combien coûte une réparation ?',a:"Le diagnostic est toujours offert et sans engagement. Le devis vous est communiqué avant toute intervention. Vous ne payez qu'à la réparation effectuée et validée par vos soins."},
    {q:'Faut-il prendre rendez-vous ?',a:'Non, vous pouvez déposer votre appareil directement au 145 Avenue Pierre Brossolette, Troyes sans rendez-vous. Pour une intervention en entreprise, un créneau est à convenir par téléphone.'},
    {q:'Quels appareils réparez-vous ?',a:"Nous intervenons sur smartphones, tablettes, PC portables et PC fixes toutes marques : Apple, Samsung, Dell, HP, Lenovo, Asus, Xiaomi, Huawei et bien d'autres. Consoles sur demande."},
    {q:'Quel est le délai de réparation ?',a:'La plupart des réparations courantes (écran, batterie, connecteur) sont réalisées le jour même, souvent en 1h. Pour les pannes plus complexes, le délai est communiqué lors du devis.'},
    {q:'Mes données sont-elles en sécurité ?',a:'Nous vous recommandons de sauvegarder vos données avant le dépôt. Nos techniciens interviennent dans le strict respect de votre vie privée.'},
    {q:'Proposez-vous une garantie sur les réparations ?',a:"Oui, toutes nos réparations sont couvertes par une garantie sur la pièce remplacée et la main d'œuvre, dont la durée est précisée sur votre facture."},
    {q:'Intervenez-vous en entreprise ?',a:"Oui ! LDS INFORMATIK propose des contrats d'infogérance pour TPE/PME à partir de 29€/mois/utilisateur : maintenance, support, Microsoft 365, cybersécurité. Contactez-nous pour un audit gratuit."},
  ]

  const PARTNERS = ['Microsoft','Apple','Samsung','Dell','HP','Lenovo','Asus','Kaspersky','Norton','Logitech']

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        :root{--primary:#004AAD;--secondary:#162a68;--bg:#f7faff;--text:#1a1a2e;--gray:#6b7280;--light:#e8f0fe;--border:#e5e9f2;}
        .lds-page{font-family:'Inter',sans-serif;color:var(--text);background:var(--bg);}
        .hero{padding:56px 32px 40px;background:linear-gradient(135deg,#010810,#0a1628,#0d2044,#1a3a6e);color:#fff;}
        .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;max-width:1100px;margin:auto;}
        .hero h1{font-size:clamp(2rem,4vw,3.4rem);font-weight:800;line-height:1.1;color:#fff;margin-bottom:18px;}
        .hero h1 span{color:#63d3c5;}
        .hero-sub{font-size:14.5px;color:rgba(255,255,255,.75);margin-bottom:28px;max-width:520px;line-height:1.7;}
        .hero-btns{display:flex;gap:12px;flex-wrap:wrap;}
        .btn-p{font-size:13.5px;font-weight:600;color:#fff;background:var(--primary);border:none;padding:14px 26px;border-radius:13px;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-block;}
        .btn-p:hover{background:var(--secondary);transform:translateY(-2px);}
        .btn-s{font-size:13.5px;font-weight:600;color:rgba(255,255,255,.9);background:transparent;border:1.5px solid rgba(255,255,255,.3);padding:13px 24px;border-radius:13px;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-block;}
        .btn-s:hover{border-color:#fff;background:rgba(255,255,255,.08);}
        .hero-card{background:rgba(255,255,255,.1);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.15);border-radius:20px;padding:32px;}
        .hero-card h3{font-size:1.1rem;font-weight:700;margin-bottom:16px;color:#fff;}
        .hero-card ul{list-style:none;display:grid;gap:10px;padding:0;margin:0;}
        .hero-card li{background:rgba(255,255,255,.09);padding:12px 16px;border-radius:12px;font-size:13.5px;color:rgba(255,255,255,.9);}
        .trust-band{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
        .trust-item{padding:18px 20px;text-align:center;position:relative;}
        .trust-item:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:var(--border);}
        .trust-num{font-size:1.6rem;font-weight:800;color:var(--primary);}
        .trust-lbl{font-size:11.5px;color:var(--gray);margin-top:4px;}
        .stag{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--primary);font-weight:700;margin-bottom:8px;}
        .stitle{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;color:var(--secondary);margin-bottom:32px;}
        .stitle strong{color:var(--primary);}
        .cards{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;padding:48px 32px;}
        .scard{background:#fff;border:1px solid var(--border);border-radius:18px;padding:28px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden;text-decoration:none;color:inherit;display:block;}
        .scard:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,74,173,.1);}
        .scard::after{content:'';position:absolute;bottom:0;left:0;width:0;height:3px;background:var(--primary);transition:width .3s;}
        .scard:hover::after{width:100%;}
        .cbadge{font-size:10.5px;font-weight:700;color:var(--primary);background:var(--light);border-radius:999px;padding:4px 12px;display:inline-block;margin-bottom:12px;}
        .cicon{font-size:2rem;margin-bottom:10px;}
        .cname{font-size:1.1rem;font-weight:700;color:var(--secondary);margin-bottom:8px;}
        .cdesc{font-size:13px;color:var(--gray);line-height:1.7;margin-bottom:16px;}
        .clink{font-size:13px;font-weight:600;color:var(--primary);}
        .avis-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
        .avis-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:10px;}
        .avis-avatar{width:38px;height:38px;border-radius:50%;background:var(--light);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--primary);flex-shrink:0;}
        .pourquoi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
        .pourquoi-card{background:#fff;border:1px solid var(--border);border-radius:18px;padding:28px;display:flex;align-items:flex-start;gap:18px;}
        .pourquoi-ico{width:48px;height:48px;border-radius:12px;background:var(--light);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
        .faq-item{background:#fff;border:1px solid var(--border);border-radius:14px;margin-bottom:8px;overflow:hidden;}
        .faq-item summary{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;cursor:pointer;font-size:13.5px;font-weight:600;color:var(--secondary);list-style:none;}
        .faq-item summary:hover{background:var(--light);}
        .faq-item summary::marker,.faq-item summary::-webkit-details-marker{display:none;}
        .faq-body{padding:0 20px 16px;}
        .faq-body p{font-size:13px;color:var(--gray);line-height:1.7;margin:0;}
        .cta-block{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:24px;padding:56px 40px;text-align:center;color:#fff;margin:0 32px 48px;}
        .cta-block h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;margin-bottom:12px;}
        .cta-block p{font-size:14px;opacity:.85;margin-bottom:28px;}
        .cta-btns{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}
        .btn-white{font-size:13.5px;font-weight:600;color:var(--primary);background:#fff;border:none;padding:13px 26px;border-radius:13px;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-block;}
        .btn-white:hover{background:var(--light);}
        .partners-track-wrap{overflow:hidden;width:100%;mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent);-webkit-mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent);}
        .partners-track{display:flex;align-items:center;gap:16px;width:max-content;animation:partnersScroll 30s linear infinite;}
        .partners-track:hover{animation-play-state:paused;}
        @keyframes partnersScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .partner-logo{flex-shrink:0;display:flex;align-items:center;justify-content:center;padding:14px 28px;background:#fff;border:1px solid var(--border);border-radius:14px;height:70px;min-width:130px;font-size:14px;font-weight:700;color:var(--secondary);transition:box-shadow .2s,transform .2s;}
        .partner-logo:hover{box-shadow:0 6px 20px rgba(0,74,173,.1);transform:translateY(-2px);}
        .google-btn{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--primary);text-decoration:none;padding:11px 22px;border:1.5px solid var(--primary);border-radius:10px;transition:all .18s;}
        .google-btn:hover{background:var(--primary);color:#fff;}
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr;}
          .hero-card{display:none;}
          .cards{grid-template-columns:1fr;padding:24px 16px;}
          .avis-grid{grid-template-columns:1fr;}
          .pourquoi-grid{grid-template-columns:1fr;}
          .hero{padding:40px 16px 28px;}
          .cta-block{margin:0 16px 32px;padding:36px 20px;}
        }
        @media(max-width:560px){
          .hero-btns{flex-direction:column;}
          .btn-p,.btn-s{width:100%;text-align:center;}
          .cta-btns{flex-direction:column;align-items:center;}
        }
      `}</style>

      <div className="lds-page">

        {/* HERO */}
        <section className="hero">
          <div className="hero-grid">
            <div>
              <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'8px 18px',border:'1.5px solid rgba(99,211,197,.3)',borderRadius:'999px',fontSize:'13px',fontWeight:500,color:'#63d3c5',background:'rgba(99,211,197,.08)',marginBottom:'20px'}}>
                <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#63d3c5',flexShrink:0,boxShadow:'0 0 6px #63d3c5'}}></span>
                <span>Lun–Ven 9h–19h · Sam 10h–17h</span>
              </div>
              <h1>Votre expert <span>informatique</span> à Troyes</h1>
              <p className="hero-sub">Depuis 2023, LDS INFORMATIK accompagne les particuliers et les professionnels pour tous leurs besoins informatique et téléphonie.</p>
              <div className="hero-btns">
                <a href="/contact" className="btn-p">Demander un devis</a>
                <a href="/reparer" className="btn-s">Découvrir nos services</a>
              </div>
            </div>
            <div className="hero-card">
              <h3>L&apos;informatique pour les particuliers et les professionnels</h3>
              <ul>
                <li>✔ Réparation Mac, PC &amp; Smartphone</li>
                <li>✔ PC sur mesure</li>
                <li>✔ Infogérance, Cloud &amp; Sécurité</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TRUST BAND */}
        <div className="trust-band">
          <div className="trust-item"><div className="trust-num">10 ans</div><div className="trust-lbl">D&apos;expertise terrain</div></div>
          <div className="trust-item"><div className="trust-num">99,9 %</div><div className="trust-lbl">Clients satisfaits</div></div>
          <div className="trust-item"><div className="trust-num">3 ans</div><div className="trust-lbl">Garantie incluse*<br/><span style={{fontSize:'10px',opacity:.7}}>voir CGV</span></div></div>
        </div>

        {/* SERVICES */}
        <div style={{padding:'28px 32px 0'}}>
          <div className="stag">Nos services</div>
          <div className="stitle">Une offre <strong>complète</strong> pour tous vos besoins</div>
        </div>
        <div className="cards">
          {SERVICES.map((s) => (
            <a key={s.name} href={s.href} className="scard">
              {s.badge && <div className="cbadge">{s.badge}</div>}
              <div className="cicon">{s.ico}</div>
              <div className="cname">{s.name}</div>
              <p className="cdesc">{s.desc}</p>
              <div className="clink">{s.link}</div>
            </a>
          ))}
        </div>

        {/* AVIS */}
        <div style={{padding:'24px 32px 32px'}}>
          <div className="stag">Ils nous font confiance</div>
          <div className="stitle" style={{marginBottom:'6px'}}>Ce que disent nos <strong>clients</strong></div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
            <img src="https://www.google.com/favicon.ico" alt="Google" width={16} height={16} />
            <span style={{fontSize:'13px',color:'var(--gray)'}}>Avis Google vérifiés</span>
            <span style={{fontSize:'13px',color:'#F59E0B',letterSpacing:'1px'}}>★★★★★</span>
          </div>
          <div className="avis-grid">
            {AVIS.map((a) => (
              <div key={a.nom} className="avis-card">
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div className="avis-avatar">{a.nom.split(' ').map((w:string)=>w[0]).join('').toUpperCase()}</div>
                  <div>
                    <div style={{fontSize:'13px',fontWeight:700,color:'var(--secondary)'}}>{a.nom}</div>
                    <div style={{fontSize:'11px',color:'var(--gray)'}}>{a.date}</div>
                  </div>
                  <img src="https://www.google.com/favicon.ico" alt="G" width={14} height={14} style={{marginLeft:'auto',opacity:.6}} />
                </div>
                <div style={{fontSize:'14px',color:'#F59E0B',letterSpacing:'1px'}}>★★★★★</div>
                <p style={{fontSize:'13px',color:'var(--gray)',lineHeight:1.6,margin:0}}>&ldquo;{a.texte}&rdquo;</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'20px'}}>
            <a href="https://share.google/DMnd40szJ82iOlb9I" target="_blank" rel="noopener noreferrer" className="google-btn">
              <img src="https://www.google.com/favicon.ico" alt="" width={15} height={15} />
              Voir tous nos avis sur Google →
            </a>
          </div>
        </div>

        {/* POURQUOI */}
        <div style={{padding:'48px 32px',background:'var(--bg)'}}>
          <div style={{maxWidth:'900px',margin:'0 auto'}}>
            <div className="stag" style={{textAlign:'center'}}>Nos engagements</div>
            <div className="stitle" style={{textAlign:'center',marginBottom:'28px'}}>Pourquoi choisir <strong>LDS INFORMATIK</strong> ?</div>
            <div className="pourquoi-grid">
              {POURQUOI.map((p) => (
                <div key={p.title} className="pourquoi-card">
                  <div className="pourquoi-ico">{p.ico}</div>
                  <div>
                    <div style={{fontSize:'14px',fontWeight:700,color:'var(--secondary)',marginBottom:'6px'}}>{p.title}</div>
                    <div style={{fontSize:'13px',color:'var(--gray)',lineHeight:1.7}}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{padding:'48px 32px',background:'#fff'}}>
          <div style={{maxWidth:'780px',margin:'0 auto'}}>
            <div className="stag" style={{textAlign:'center'}}>FAQ</div>
            <div className="stitle" style={{textAlign:'center',marginBottom:'24px'}}>Les questions <strong>fréquentes</strong></div>
            {FAQ.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q} <span style={{fontSize:'18px',color:'var(--primary)',marginLeft:'auto',flexShrink:0}}>﹀</span></summary>
                <div className="faq-body"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>

        {/* PARTENAIRES */}
        <div style={{padding:'48px 32px',background:'var(--bg)'}}>
          <div className="stitle" style={{textAlign:'center',marginBottom:'6px'}}>Nos <strong>partenaires</strong></div>
          <p style={{textAlign:'center',fontSize:'13.5px',color:'var(--gray)',maxWidth:'520px',margin:'0 auto 32px',lineHeight:1.7}}>Nous travaillons avec les leaders du secteur pour vous garantir les meilleures solutions technologiques.</p>
          <div className="partners-track-wrap">
            <div className="partners-track">
              {[...PARTNERS,...PARTNERS].map((name, i) => (
                <div key={i} className="partner-logo">{name}</div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-block">
          <h2>Besoin d&apos;aide pour votre appareil ?</h2>
          <p>Diagnostic gratuit, devis sans engagement. Nous intervenons sur tous vos appareils à Troyes et alentours.</p>
          <div className="cta-btns">
            <a href="/contact" className="btn-white">Demander un devis gratuit</a>
            <a href="tel:0745014127" className="btn-s">📞 07 45 01 41 27</a>
          </div>
        </div>

      </div>
    </>
  )
}
