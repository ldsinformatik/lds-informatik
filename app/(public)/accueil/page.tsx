'use client'

import type { Metadata } from 'next'
import { useEffect, useState } from 'react'

// Note: metadata doit être dans un fichier séparé (layout.tsx ou generateMetadata)
// car 'use client' est incompatible avec export metadata

function HoursBadge() {
  const [text, setText] = useState('Chargement...')
  const [color, setColor] = useState('#63d3c5')
  const [borderColor, setBorderColor] = useState('rgba(99,211,197,.3)')
  const [bg, setBg] = useState('rgba(99,211,197,.08)')

  useEffect(() => {
    function update() {
      const now = new Date()
      const day = now.getDay() // 0=dim, 1=lun ... 6=sam
      const h = now.getHours()
      const m = now.getMinutes()
      const t = h * 60 + m

      const DAYS = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
      let isOpen = false
      let nextOpen = ''

      if (day >= 1 && day <= 5) {
        const matin = t >= 570 && t < 780      // 9h30-13h
        const apresmidi = t >= 870 && t < 1110 // 14h30-18h30
        isOpen = matin || apresmidi
        if (!isOpen) {
          if (t < 570) nextOpen = "Ouvre aujourd'hui à 9h30"
          else if (t >= 780 && t < 870) nextOpen = 'Rouvre à 14h30'
          else {
            const next = day === 5 ? 'Samedi' : DAYS[day + 1]
            nextOpen = 'Ouvre ' + next + ' à 9h30'
          }
        }
      } else if (day === 6) {
        isOpen = t >= 570 && t < 840 // 9h30-14h
        if (!isOpen) {
          if (t < 570) nextOpen = "Ouvre aujourd'hui à 9h30"
          else nextOpen = 'Ouvre Lundi à 9h30'
        }
      } else {
        nextOpen = 'Ouvre Lundi à 9h30'
      }

      if (isOpen) {
        let closeH: number, closeM: string
        if (day >= 1 && day <= 5) {
          if (t < 780) { closeH = 13; closeM = '00' }
          else { closeH = 18; closeM = '30' }
        } else {
          closeH = 14; closeM = '00'
        }
        setText('Ouvert · Ferme à ' + closeH + 'h' + closeM)
        setColor('#63d3c5')
        setBorderColor('rgba(99,211,197,.35)')
        setBg('rgba(99,211,197,.08)')
      } else {
        setText(nextOpen || 'Fermé')
        setColor('#f87171')
        setBorderColor('rgba(248,113,113,.3)')
        setBg('rgba(248,113,113,.08)')
      }
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'8px 18px',border:'1.5px solid '+borderColor,borderRadius:'999px',fontSize:'13px',fontWeight:500,color:color,background:bg,marginBottom:'20px',backdropFilter:'blur(8px)'}}>
      <span style={{width:'8px',height:'8px',borderRadius:'50%',background:color,flexShrink:0,boxShadow:'0 0 6px '+color}}></span>
      <span>{text}</span>
    </div>
  )
}

export default function AccueilPage() {
  const AVIS = [
    {nom:'Abigaelle',date:'il y a 2 ans',texte:"Personne très respectueux et professionnel. Très compétant, je n'hésite pas à faire de la route pour faire appel à ses compétences. Je vous le recommande."},
    {nom:'Wesley Maestro',date:'il y a un an',texte:"Intervention rapide les prix sont top, vous pouvez y aller les yeux fermés, il répondra à vos attentes et vous donnera les conseils pour vos besoins encore une fois je vous recommande."},
    {nom:'Jérome Toutof',date:'il y a un mois',texte:"J'ai fais l'acquisition d'un ipad pour ma soeur avec les équipements de protection. Elle très satisfaite de son cadeau ! Évidemment je reviendrais pour d'autres achats. Merci encore pour ton professionnalisme !"},
    {nom:'Stacy Compan',date:'il y a un mois',texte:"Je remercie infiniment le gérant de cette boutique qui a pu trouver le souci sur mon Mac et qui a pu faire le nécessaire dessus car la carte mère était HS. Le gérant est fort sympathique et surtout très professionnel et à l'écoute."},
    {nom:'Laeticia Massoudom',date:'il y a un mois',texte:'Vendeur très gentil et à l\'écoute.'},
    {nom:'El Habib Fessla',date:'il y a un mois',texte:"Achat d'un ordinateur chez LDS à un très bon prix et surtout service client rapide et efficace."},
    {nom:'Sofiane',date:'il y a un mois',texte:"Je l'ai contacté le 08/04/26, réponse très rapide. Rdv proposé le 09/04/26, au matin, et réparation effectuée dans la même journée. Je recommande pour la rapidité et le sérieux du travail. Je reviendrais."},
    {nom:'Angel Jimenez',date:'il y a un an',texte:"Merci Ludovic pour la réparation rapide et efficace le 15 juin 2024 pour réinstaller windows sur mon notebook. On fera appel à vous à la prochaine occasion sans hésiter."},
  ]

  // Shuffle et sélection de 6 avis
  const shuffledAvis = [...AVIS].sort(() => Math.random() - 0.5).slice(0, 6)

  const SERVICES = [
    {href:'/reparer',badge:'Sans RDV',ico:'🛠',name:'Réparation',desc:'PC, Mac, smartphones, tablettes. Diagnostic soigné, pièces certifiées, garantie 3 ans*. Toutes marques.',link:'Voir les détails →'},
    {href:'/acheter?tab=pc',badge:'',ico:'🖥',name:'PC sur mesure',desc:'Configurations gaming, bureautique ou pro conçues selon vos besoins et votre budget.',link:'Configurer mon PC →'},
    {href:'/acheter?tab=vente',badge:'',ico:'🛒',name:'Vente',desc:'Smartphones, PC, accessoires et matériel sélectionnés avec garantie constructeur.',link:'Voir les produits →'},
    {href:'/infogerance',badge:'Forfait mensuel',ico:'🏢',name:'Infogérance',desc:'Accompagnement IT des TPE/PME : Microsoft 365, sécurité, maintenance et support.',link:'Voir les offres →'},
  ]

  const POURQUOI = [
    {ico:'💰',title:'Tarifs fixes sans mauvaise surprise',desc:'Devis gratuit avant toute intervention. Vous savez exactement ce que vous payez, sans frais cachés.'},
    {ico:'🤝',title:'Interlocuteur dédié',desc:'Un accompagnement 100% personnalisé avec un expert qui vous connaît et qui suit votre dossier.'},
    {ico:'💳',title:'Paiement en plusieurs fois',desc:'Dès 100€, réglez en plusieurs fois par CB pour vos achats et réparations.'},
    {ico:'🛡️',title:"Jusqu'à 3 ans de garantie",desc:'Pour des achats et des réparations en toute sérénité.'},
  ]

  const FAQ = [
    {q:'Combien coûte une réparation ?',a:"Le diagnostic est toujours <strong>offert et sans engagement</strong>. Le devis vous est communiqué avant toute intervention. Vous ne payez qu'à la réparation effectuée et validée par vos soins."},
    {q:'Faut-il prendre rendez-vous ?',a:'Non, vous pouvez déposer votre appareil directement au <strong>145 Avenue Pierre Brossolette, Troyes</strong> sans rendez-vous. Pour une intervention en entreprise, un créneau est à convenir par téléphone ou via notre formulaire en ligne.'},
    {q:'Quels appareils réparez-vous ?',a:"Nous intervenons sur <strong>smartphones, tablettes, PC portables et PC fixes</strong> toutes marques : Apple, Samsung, Dell, HP, Lenovo, Asus, Xiaomi, Huawei et bien d'autres. Consoles et périphériques sur demande."},
    {q:'Quel est le délai de réparation ?',a:'La plupart des réparations courantes (écran, batterie, connecteur) sont réalisées <strong>le jour même, souvent en 1h</strong>. Pour les pannes plus complexes nécessitant des pièces spécifiques, le délai est communiqué lors du devis.'},
    {q:'Mes données sont-elles en sécurité ?',a:'Nous vous recommandons de <strong>sauvegarder vos données avant le dépôt</strong>. Nos techniciens interviennent dans le strict respect de votre vie privée. Aucun accès à vos fichiers personnels n\'est effectué sans votre accord explicite.'},
    {q:'Proposez-vous une garantie sur les réparations ?',a:"Oui, toutes nos réparations sont couvertes par une <strong>garantie sur la pièce remplacée et la main d'oeuvre</strong>, dont la durée est précisée sur votre facture. Les pièces neuves ou reconditionnées sont clairement indiquées sur le devis."},
    {q:'Intervenez-vous en entreprise ?',a:"Oui ! LDS INFORMATIK propose des contrats d'<strong>infogérance pour TPE/PME</strong> à partir de 29€/mois/utilisateur : maintenance, support, Microsoft 365, cybersécurité et sauvegarde cloud. Contactez-nous pour un audit gratuit."},
  ]

  const PARTNERS = ['Microsoft','Apple','Samsung','Dell','HP','Lenovo','Asus','Kaspersky','Norton','Logitech']

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        :root{
          --primary:#004AAD;
          --secondary:#162a68;
          --light:#d8e9ff;
          --white:#fff;
          --text:#1a1a1a;
          --gray:#6b7280;
          --border:#e5e7eb;
          --bg:#f7faff;
          --shadow:0 10px 30px rgba(0,0,0,0.07);
          --radius:20px;
          --green:#0EA66E;
        }
        *{box-sizing:border-box;}
        .lds-page{font-family:'Inter',sans-serif;color:var(--text);background:var(--bg);line-height:1.6;}

        /* ANIMATIONS */
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(0,74,173,.4)}70%{box-shadow:0 0 0 10px rgba(0,74,173,0)}100%{box-shadow:0 0 0 0 rgba(0,74,173,0)}}
        @keyframes partnersScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        /* HERO */
        .hero{padding:56px 32px 40px;}
        .hero-gradient-anim{
        background:#f5f7fb;
          background-size:300% 300%;
          animation:gradShift 5s ease infinite;
        }
        .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;max-width:1100px;margin:auto;}
        .hero h1{font-size:clamp(2rem,4vw,3.4rem);font-weight:800;line-height:1.1;color:var(--secondary);margin-bottom:18px;}
        .hero h1 span{color:var(--primary);}
        .hero-sub{font-size:14.5px;color:var(--gray);margin-bottom:28px;max-width:520px;line-height:1.7;}
        .hero-btns{display:flex;gap:12px;flex-wrap:wrap;}

        /* HERO CARD (bleu dégradé comme la maquette) */
        .hero-card{
          background:linear-gradient(135deg,#004AAD 0%,#162a68 100%);
          border-radius:28px;padding:36px;color:#fff;
          position:relative;overflow:hidden;
          min-height:400px;display:flex;flex-direction:column;justify-content:space-between;
          box-shadow:0 28px 56px rgba(0,74,173,.22);
        }
        .hero-card::before{
          content:'';position:absolute;width:240px;height:240px;border-radius:50%;
          background:rgba(255,255,255,.07);top:-70px;right:-55px;
        }
        .hero-card h3{font-size:1.6rem;font-weight:700;margin-bottom:8px;}
        .hero-card .card-sub{opacity:.8;font-size:13px;margin-bottom:20px;}
        .hero-card ul{list-style:none;display:grid;gap:10px;padding:0;margin:0;}
        .hero-card li{background:rgba(255,255,255,.09);padding:12px 16px;border-radius:12px;font-size:13.5px;}

        /* BUTTONS */
        .btn-p{
          display:inline-flex;align-items:center;justify-content:center;
          font-size:13.5px;font-weight:600;color:#fff;background:var(--primary);
          border:none;padding:13px 26px;border-radius:13px;cursor:pointer;
          box-shadow:0 8px 20px rgba(0,74,173,.22);transition:all .2s;
          text-decoration:none;
        }
        .btn-p:hover{background:var(--secondary);transform:translateY(-2px);}
        .btn-s{
          display:inline-flex;align-items:center;justify-content:center;
          font-size:13.5px;font-weight:600;color:var(--secondary);background:#fff;
          border:1px solid var(--border);padding:13px 24px;border-radius:13px;
          cursor:pointer;transition:all .2s;text-decoration:none;
        }
        .btn-s:hover{border-color:var(--primary);color:var(--primary);}

        /* URGENCE BAR */
        .urgence-bar{
          background:#fff;border:.5px solid var(--border);border-radius:14px;
          padding:16px 24px;margin:0 32px 8px;
          display:flex;align-items:center;justify-content:space-between;gap:12px;
          box-shadow:var(--shadow);
        }
        .urgence-l{display:flex;align-items:center;gap:14px;}
        .urgence-icon{width:40px;height:40px;background:#FEF3C7;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
        .urgence-title{font-size:14px;font-weight:700;color:var(--secondary);}
        .urgence-sub{font-size:12px;color:var(--gray);margin-top:2px;}
        .urgence-r{display:flex;gap:10px;flex-shrink:0;}

        /* TRUST BAND */
        .trust-band{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-top:8px;}
        .trust-item{padding:18px 20px;text-align:center;position:relative;}
        .trust-item:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:var(--border);}
        .trust-num{
          font-size:1.5rem;font-weight:800;color:var(--primary);
          background:linear-gradient(90deg,var(--primary) 30%,#0099ff 50%,var(--primary) 70%);
          background-size:200%;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 3s linear infinite;
          white-space:nowrap;
        }
        .trust-lbl{font-size:11.5px;color:var(--gray);margin-top:4px;}

        /* SECTION HEADER */
        .sh{padding:56px 32px 36px;background:#fff;border-bottom:1px solid var(--border);}
        .stag{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--primary);font-weight:700;margin-bottom:8px;}
        .stitle{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;color:var(--secondary);}
        .stitle strong{color:var(--primary);}
        .ssub{font-size:13.5px;color:var(--gray);margin-top:6px;}

        /* CARDS SERVICES */
        .cards{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;padding:48px 32px;}
        .card{
          background:#fff;border-radius:var(--radius);padding:28px;
          box-shadow:var(--shadow);border:1px solid rgba(0,0,0,.04);
          transition:all .2s;cursor:pointer;position:relative;overflow:hidden;
          text-decoration:none;color:inherit;display:block;
        }
        .card:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,74,173,.1);}
        .card::after{content:'';position:absolute;bottom:0;left:0;width:0;height:3px;background:var(--primary);transition:width .3s;}
        .card:hover::after{width:100%;}
        .cicon{width:56px;height:56px;border-radius:14px;background:var(--light);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:18px;}
        .cname{font-size:1.15rem;font-weight:700;color:var(--secondary);margin-bottom:10px;}
        .cdesc{font-size:13px;color:var(--gray);line-height:1.65;}
        .clink{display:inline-flex;align-items:center;gap:4px;font-size:12.5px;color:var(--primary);font-weight:600;margin-top:14px;text-decoration:none;}
        .cbadge{position:absolute;top:16px;right:16px;font-size:10.5px;font-weight:700;color:var(--primary);background:var(--light);padding:3px 10px;border-radius:20px;}

        /* AVIS */
        .avis-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;}
        .avis-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:10px;}
        .avis-avatar{width:38px;height:38px;border-radius:50%;background:var(--light);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--primary);flex-shrink:0;}

        /* POURQUOI */
        .pourquoi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
        .pourquoi-card{background:#fff;border:1px solid var(--border);border-radius:18px;padding:28px;display:flex;align-items:flex-start;gap:18px;transition:transform .25s,box-shadow .25s;}
        .pourquoi-card:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(0,74,173,.13);}
        .pourquoi-ico{width:48px;height:48px;border-radius:12px;background:var(--light);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}

        /* FAQ */
        .faq-item{background:#fff;border:1px solid var(--border);border-radius:14px;margin-bottom:8px;overflow:hidden;}
        .faq-q{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;cursor:pointer;font-size:13.5px;font-weight:600;color:var(--secondary);}
        .faq-q:hover{background:var(--light);}
        .faq-a{padding:0 20px 16px;display:none;}
        .faq-item.open .faq-a{display:block;}
        .faq-a p{font-size:13px;color:var(--gray);line-height:1.7;margin:0;}
        .faq-ico{font-size:16px;color:var(--primary);margin-left:auto;flex-shrink:0;transition:transform .25s;}
        .faq-item.open .faq-ico{transform:rotate(180deg);}

        /* CTA BLOCK */
        .cta-block{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:24px;padding:56px 40px;text-align:center;color:#fff;margin:0 32px 48px;}
        .cta-block h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;margin-bottom:12px;}
        .cta-block p{font-size:14px;opacity:.85;margin-bottom:28px;}
        .cta-btns{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}
        .btn-white{font-size:13.5px;font-weight:600;color:var(--primary);background:#fff;border:none;padding:13px 26px;border-radius:13px;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-block;}
        .btn-white:hover{background:var(--light);}
        .btn-outline-white{font-size:13.5px;font-weight:600;color:#fff;background:transparent;border:1.5px solid rgba(255,255,255,.5);padding:12px 24px;border-radius:13px;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-block;}
        .btn-outline-white:hover{background:rgba(255,255,255,.1);border-color:#fff;}

        /* PARTNERS */
        .partners-track-wrap{overflow:hidden;width:100%;mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent);-webkit-mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent);}
        .partners-track{display:flex;align-items:center;gap:16px;width:max-content;animation:partnersScroll 30s linear infinite;}
        .partners-track:hover{animation-play-state:paused;}
        .partner-logo{flex-shrink:0;display:flex;align-items:center;justify-content:center;padding:14px 28px;background:#fff;border:1px solid var(--border);border-radius:14px;height:70px;min-width:130px;font-size:14px;font-weight:700;color:var(--secondary);transition:box-shadow .2s,transform .2s;}
        .partner-logo:hover{box-shadow:0 6px 20px rgba(0,74,173,.1);transform:translateY(-2px);}

        /* GOOGLE BTN */
        .google-btn{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--primary);text-decoration:none;padding:11px 22px;border:1.5px solid var(--primary);border-radius:10px;transition:all .18s;}
        .google-btn:hover{background:var(--primary);color:#fff;}

        /* RESPONSIVE */
        @media(max-width:900px){
          .hero-grid,.pourquoi-grid{grid-template-columns:1fr;}
          .cards{grid-template-columns:1fr 1fr;}
          .avis-grid{grid-template-columns:1fr 1fr;}
          .urgence-bar{flex-direction:column;align-items:flex-start;margin:0 12px 8px;gap:12px;}
          .urgence-r{width:100%;}
        }
        @media(max-width:768px){
          .hero{padding:28px 16px 20px;}
          .hero h1{font-size:1.8rem;}
          .hero-card{min-height:auto;padding:24px;}
          .hero-card h3{font-size:1.2rem;}
          .cards{grid-template-columns:1fr;padding:24px 16px;}
          .avis-grid{grid-template-columns:1fr;}
          .cta-block{margin:0 16px 32px;padding:36px 20px;}
        }
        @media(max-width:560px){
          .hero-btns{flex-direction:column;}
          .btn-p,.btn-s{width:100%;text-align:center;justify-content:center;}
          .cta-btns{flex-direction:column;align-items:center;}
          .pourquoi-grid{grid-template-columns:1fr !important;gap:14px !important;}
          .pourquoi-card{padding:18px 16px !important;}
        }
      `}</style>

      <div className="lds-page">

        {/* HERO avec gradient animé */}
        <section className="hero hero-gradient-anim">
          <div className="hero-grid">
            <div>
              <HoursBadge />
              <h1 style={{color:'#fff'}}>Votre expert <span style={{color:'#63d3c5'}}>informatique</span> à Troyes</h1>
              <p className="hero-sub" style={{color:'rgba(255,255,255,.75)'}}>
                Depuis 2023, LDS INFORMATIK accompagne les particuliers et les professionnels pour tous leurs besoins informatique et téléphonie.
              </p>
              <div className="hero-btns">
                <a href="/contact" className="btn-p">Demander un devis</a>
                <a href="/reparer" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'13.5px',fontWeight:600,color:'var(--secondary)',background:'#fff',border:'1px solid var(--border)',padding:'13px 24px',borderRadius:'13px',cursor:'pointer',transition:'all .2s',textDecoration:'none'}}>
                  Découvrir nos services
                </a>
              </div>
            </div>
            <div className="hero-card">
              <div>
                <h3>L&apos;informatique pour les particuliers et les professionnels</h3>
              </div>
              <ul>
                <li>✔ Réparation Mac, PC &amp; Smartphone</li>
                <li>✔ PC sur mesure</li>
                <li>✔ Infogérance, Cloud &amp; Sécurité</li>
              </ul>
            </div>
          </div>
        </section>

        {/* URGENCE BAR */}
        <div className="urgence-bar">
          <div className="urgence-l">
            <div className="urgence-icon">⚡</div>
            <div>
              <div className="urgence-title">Besoin urgent ? Intervention rapide disponible</div>
              <div className="urgence-sub">Dépôt sans rendez-vous · 145 Avenue Pierre Brossolette, Troyes</div>
            </div>
          </div>
          <div className="urgence-r">
            <a href="/contact" className="btn-p" style={{padding:'9px 20px',fontSize:'12.5px'}}>Demander un devis</a>
            <a href="tel:0745014127" className="btn-s" style={{padding:'9px 18px',fontSize:'12.5px'}}>📞 Appeler</a>
          </div>
        </div>

        {/* TRUST BAND */}
        <div className="trust-band">
          <div className="trust-item">
            <div className="trust-num">10 ans</div>
            <div className="trust-lbl">D&apos;expertise terrain</div>
          </div>
          <div className="trust-item">
            <div className="trust-num">99,9 %</div>
            <div className="trust-lbl">Clients satisfaits</div>
          </div>
          <div className="trust-item">
            <div className="trust-num">3 ans</div>
            <div className="trust-lbl">Garantie incluse*<br/><span style={{fontSize:'10px',opacity:.7}}>voir CGV</span></div>
          </div>
        </div>

        {/* SERVICES */}
        <div style={{padding:'28px 32px 0'}}>
          <div className="stag">Nos services</div>
          <div className="stitle">Une offre <strong>complète</strong> pour tous vos besoins</div>
        </div>
        <div className="cards">
          {SERVICES.map((s) => (
            <a key={s.name} href={s.href} className="card">
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
            {shuffledAvis.map((a, i) => (
              <div key={i} className="avis-card">
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
          <div style={{textAlign:'center',marginTop:'8px',paddingBottom:'8px'}}>
            <a href="https://share.google/DMnd40szJ82iOlb9I" target="_blank" rel="noopener noreferrer" className="google-btn">
              <img src="https://www.google.com/favicon.ico" alt="" width={15} height={15} />
              Voir tous nos avis sur Google →
            </a>
          </div>
        </div>

        {/* POURQUOI */}
        <div style={{padding:'64px 32px',background:'var(--bg)'}}>
          <div style={{maxWidth:'900px',margin:'0 auto'}}>
            <div className="stag" style={{textAlign:'center',margin:'0 auto 8px'}}>Nos engagements</div>
            <div className="stitle" style={{textAlign:'center',margin:'0 auto 28px'}}>Pourquoi choisir <strong>LDS INFORMATIK</strong> ?</div>
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
            <div className="stag" style={{textAlign:'center',margin:'0 auto 8px'}}>FAQ</div>
            <div className="stitle" style={{textAlign:'center',margin:'0 auto 24px'}}>Les questions <strong>fréquentes</strong></div>
            {FAQ.map((f) => (
              <details key={f.q} className="faq-item" style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'14px',marginBottom:'8px',overflow:'hidden'}}>
                <summary style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',cursor:'pointer',fontSize:'13.5px',fontWeight:600,color:'var(--secondary)',listStyle:'none'}}>
                  {f.q}
                  <span style={{fontSize:'18px',color:'var(--primary)',marginLeft:'auto',flexShrink:0}}>﹀</span>
                </summary>
                <div style={{padding:'0 20px 16px'}}>
                  <p style={{fontSize:'13px',color:'var(--gray)',lineHeight:1.7,margin:0}} dangerouslySetInnerHTML={{__html:f.a}} />
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* PARTENAIRES */}
        <div style={{padding:'64px 32px',background:'var(--bg)'}}>
          <div className="stitle" style={{textAlign:'center',margin:'0 auto 6px'}}>Nos <strong>partenaires</strong></div>
          <p style={{textAlign:'center',fontSize:'13.5px',color:'var(--gray)',maxWidth:'520px',margin:'0 auto 32px',lineHeight:1.7}}>
            Nous travaillons avec les leaders du secteur pour vous garantir les meilleures solutions technologiques.
          </p>
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
            <a href="tel:0745014127" className="btn-outline-white">📞 07 45 01 41 27</a>
          </div>
        </div>

      </div>
    </>
  )
}
