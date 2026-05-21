"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AccueilPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll reveal
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observerRef.current?.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-d1, .reveal-d2, .reveal-d3, .reveal-d4").forEach((el) =>
      observerRef.current?.observe(el)
    );
    return () => observerRef.current?.disconnect();
  }, []);

  // Animated counters
  useEffect(() => {
    function animateCounter(el: Element, target: number, suffix: string, duration = 1200) {
      const isFloat = target % 1 !== 0;
      let startTime: number | null = null;
      function step(ts: number) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = isFloat
          ? (target * ease).toFixed(1)
          : Math.floor(target * ease);
        (el as HTMLElement).textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else (el as HTMLElement).textContent = target + suffix;
      }
      requestAnimationFrame(step);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting && !el.dataset.counted) {
            el.dataset.counted = "1";
            animateCounter(el, parseFloat(el.dataset.count || "0"), el.dataset.suffix || "");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Live hours badge
  useEffect(() => {
    function updateHoursBadge() {
      const badge = document.getElementById("hours-badge");
      const dot = document.getElementById("hours-dot");
      const text = document.getElementById("hours-text");
      if (!badge || !dot || !text) return;

      const now = new Date();
      const day = now.getDay();
      const t = now.getHours() * 60 + now.getMinutes();
      const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
      let isOpen = false;
      let nextOpen = "";

      if (day >= 1 && day <= 5) {
        const matin = t >= 570 && t < 780;
        const aprem = t >= 870 && t < 1110;
        isOpen = matin || aprem;
        if (!isOpen) {
          if (t < 570) nextOpen = "Ouvre aujourd'hui à 9h30";
          else if (t >= 780 && t < 870) nextOpen = "Rouvre à 14h30";
          else nextOpen = "Ouvre " + (day === 5 ? "Samedi" : DAYS[day + 1]) + " à 9h30";
        }
      } else if (day === 6) {
        isOpen = t >= 570 && t < 840;
        if (!isOpen) nextOpen = t < 570 ? "Ouvre aujourd'hui à 9h30" : "Ouvre Lundi à 9h30";
      } else {
        nextOpen = "Ouvre Lundi à 9h30";
      }

      if (isOpen) {
        dot.style.background = "#63d3c5";
        dot.style.boxShadow = "0 0 6px #63d3c5";
        badge.style.borderColor = "rgba(99,211,197,.35)";
        badge.style.color = "#63d3c5";
        badge.style.background = "rgba(99,211,197,.08)";
        let closeH = 18, closeM = "30";
        if (day >= 1 && day <= 5) {
          if (t < 780) { closeH = 13; closeM = "00"; }
        } else { closeH = 14; closeM = "00"; }
        text.textContent = `Ouvert · Ferme à ${closeH}h${closeM}`;
      } else {
        dot.style.background = "#f87171";
        dot.style.boxShadow = "0 0 6px #f87171";
        badge.style.borderColor = "rgba(248,113,113,.3)";
        badge.style.color = "#f87171";
        badge.style.background = "rgba(248,113,113,.08)";
        text.textContent = nextOpen || "Fermé";
      }
    }
    updateHoursBadge();
    const interval = setInterval(updateHoursBadge, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        :root {
          --primary: #004AAD;
          --secondary: #162a68;
          --light: #d8e9ff;
          --gray: #6b7280;
          --border: #e5e7eb;
          --bg: #f7faff;
          --shadow: 0 10px 30px rgba(0,0,0,0.07);
          --radius: 20px;
          --green: #0EA66E;
        }
        .reveal, .reveal-d1, .reveal-d2, .reveal-d3, .reveal-d4 {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1);
        }
        .reveal-d1 { transition-delay: .05s; }
        .reveal-d2 { transition-delay: .12s; }
        .reveal-d3 { transition-delay: .19s; }
        .reveal-d4 { transition-delay: .26s; }
        .reveal.visible, .reveal-d1.visible, .reveal-d2.visible,
        .reveal-d3.visible, .reveal-d4.visible {
          opacity: 1; transform: translateY(0);
        }
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .trust-num {
          font-size: 1.5rem; font-weight: 800;
          background: linear-gradient(90deg, var(--primary) 30%, #0099ff 50%, var(--primary) 70%);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
          white-space: nowrap;
        }
        .card-hover {
          transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,74,173,.13);
        }
        .btn-p {
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 13.5px; font-weight: 600; color: #fff;
          background: var(--primary); border: none;
          padding: 13px 26px; border-radius: 13px; cursor: pointer;
          box-shadow: 0 8px 20px rgba(0,74,173,.22); transition: all .2s;
          text-decoration: none;
        }
        .btn-p:hover { background: var(--secondary); transform: translateY(-2px); }
        .btn-s {
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 13.5px; font-weight: 600; color: var(--secondary);
          background: #fff; border: 1px solid var(--border);
          padding: 13px 24px; border-radius: 13px; cursor: pointer;
          transition: all .2s; text-decoration: none;
        }
        .btn-s:hover { border-color: var(--primary); color: var(--primary); }
        .trust-band {
          display: grid; grid-template-columns: repeat(3,1fr);
          background: #fff;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          margin-top: 8px;
        }
        .trust-item {
          padding: 18px 20px; text-align: center; position: relative;
        }
        .trust-item:not(:last-child)::after {
          content: ''; position: absolute; right: 0; top: 20%;
          height: 60%; width: 1px; background: var(--border);
        }
        .trust-lbl { font-size: 11.5px; color: var(--gray); margin-top: 4px; }
        .cards {
          display: grid; grid-template-columns: repeat(2,1fr);
          gap: 24px; padding: 48px 32px;
        }
        .card {
          background: #fff; border-radius: var(--radius);
          padding: 28px; box-shadow: var(--shadow);
          border: 1px solid rgba(0,0,0,.04);
          transition: all .2s; cursor: pointer; position: relative; overflow: hidden;
        }
        .card::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 3px; background: var(--primary); transition: width .3s;
        }
        .card:hover::after { width: 100%; }
        .cicon {
          width: 56px; height: 56px; border-radius: 14px;
          background: var(--light); display: flex; align-items: center;
          justify-content: center; font-size: 1.5rem; margin-bottom: 18px;
        }
        .cname { font-size: 1.15rem; font-weight: 700; color: var(--secondary); margin-bottom: 10px; }
        .cdesc { font-size: 13px; color: var(--gray); line-height: 1.65; }
        .clink {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 12.5px; color: var(--primary); font-weight: 600;
          margin-top: 14px; text-decoration: none;
        }
        .cbadge {
          position: absolute; top: 16px; right: 16px;
          font-size: 10.5px; font-weight: 700; color: var(--primary);
          background: var(--light); padding: 3px 10px; border-radius: 20px;
        }
        .stag {
          font-size: 11px; text-transform: uppercase; letter-spacing: .1em;
          color: var(--primary); font-weight: 700; margin-bottom: 8px;
        }
        .stitle { font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; color: var(--secondary); }
        .stitle strong { color: var(--primary); }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .cards { grid-template-columns: 1fr 1fr !important; padding: 12px; gap: 12px; }
          .trust-band { grid-template-columns: repeat(3,1fr); }
          .hero-inner { padding: 28px 16px 20px !important; }
          .hero h1 { font-size: 1.8rem !important; }
          .hero-card { min-height: auto !important; padding: 24px !important; }
          .hero-btns { flex-wrap: wrap; }
        }
        @media (max-width: 560px) {
          .cards { grid-template-columns: 1fr !important; }
          .hero-btns { flex-direction: column; }
          .hero-btns .btn-p, .hero-btns .btn-s { width: 100%; text-align: center; }
          #avis-container { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ background: "var(--bg)" }}>
        <div
          className="hero-inner"
          style={{ padding: "56px 32px 40px" }}
        >
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
              maxWidth: "100%",
              margin: "auto",
            }}
          >
            {/* Colonne texte */}
            <div>
              {/* Badge horaires live */}
              <div
                id="hours-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 18px",
                  border: "1.5px solid rgba(99,211,197,.3)",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#63d3c5",
                  background: "rgba(99,211,197,.08)",
                  marginBottom: 20,
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  id="hours-dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#63d3c5",
                    flexShrink: 0,
                    boxShadow: "0 0 6px #63d3c5",
                  }}
                />
                <span id="hours-text">Chargement...</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.4rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: "var(--secondary)",
                  marginBottom: 18,
                }}
              >
                Votre expert{" "}
                <span style={{ color: "var(--primary)" }}>informatique</span>{" "}
                à Troyes
              </h1>

              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--gray)",
                  marginBottom: 28,
                  maxWidth: 520,
                  lineHeight: 1.7,
                }}
              >
                Depuis 2023, LDS INFORMATIK accompagne les particuliers et les
                professionnels pour tous leurs besoins informatique et téléphonie.
              </p>

              <div
                className="hero-btns"
                style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
              >
                <Link href="/contact" className="btn-p">
                  Demander un devis
                </Link>
                <Link href="/reparez" className="btn-s">
                  Découvrir nos services
                </Link>
              </div>
            </div>

            {/* Carte hero bleue */}
            <div
              className="hero-card"
              style={{
                background: "linear-gradient(135deg, #004AAD 0%, #162a68 100%)",
                borderRadius: 28,
                padding: 36,
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 28px 56px rgba(0,74,173,.22)",
              }}
            >
              {/* Cercle décoratif */}
              <div
                style={{
                  position: "absolute",
                  width: 240,
                  height: 240,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.07)",
                  top: -70,
                  right: -55,
                }}
              />
              <div>
                <h3
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  L&apos;informatique pour les particuliers et les professionnels
                </h3>
              </div>
              <ul style={{ listStyle: "none", display: "grid", gap: 10 }}>
                {[
                  "✔ Réparation Mac, PC & Smartphone",
                  "✔ PC sur mesure",
                  "✔ Infogérance, Cloud & Sécurité",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      background: "rgba(255,255,255,.09)",
                      padding: "12px 16px",
                      borderRadius: 12,
                      fontSize: 13.5,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust band */}
        <div className="trust-band reveal">
          <div className="trust-item">
            <div className="trust-num">
              <span data-count="10" data-suffix=" ans">
                10 ans
              </span>
            </div>
            <div className="trust-lbl">D&apos;expertise terrain</div>
          </div>
          <div className="trust-item">
            <div className="trust-num">
              <span data-count="99.9" data-suffix=" %">
                99,9 %
              </span>
            </div>
            <div className="trust-lbl">Clients satisfaits</div>
          </div>
          <div className="trust-item">
            <div className="trust-num">
              <span data-count="3" data-suffix=" ans">
                3 ans
              </span>
            </div>
            <div className="trust-lbl">
              Garantie incluse*
              <br />
              <span style={{ fontSize: 10, opacity: 0.7 }}>voir CGV</span>
            </div>
          </div>
        </div>

        {/* Section services */}
        <div style={{ padding: "28px 32px 0" }}>
          <div className="stag reveal">Nos services</div>
          <div className="stitle reveal">
            Une offre <strong>complète</strong> pour tous vos besoins
          </div>
        </div>

        <div className="cards">
          {[
            {
              badge: "Sans RDV",
              icon: "🛠",
              name: "Réparation",
              desc: "PC, Mac, smartphones, tablettes. Diagnostic soigné, pièces certifiées, garantie 3 ans*. Toutes marques.",
              link: "Voir les détails →",
              href: "/reparez",
              delay: "reveal-d1",
            },
            {
              badge: null,
              icon: "🖥",
              name: "PC sur mesure",
              desc: "Configurations gaming, bureautique ou pro conçues selon vos besoins et votre budget.",
              link: "Configurer mon PC →",
              href: "/achetez",
              delay: "reveal-d2",
            },
            {
              badge: null,
              icon: "🛒",
              name: "Vente",
              desc: "Smartphones, PC, accessoires et matériel sélectionnés avec garantie constructeur.",
              link: "Voir les produits →",
              href: "/achetez",
              delay: "reveal-d3",
            },
            {
              badge: "Forfait mensuel",
              icon: "🏢",
              name: "Infogérance",
              desc: "Accompagnement IT des TPE/PME : Microsoft 365, sécurité, maintenance et support.",
              link: "Voir les offres →",
              href: "/infogerance",
              delay: "reveal-d4",
            },
          ].map((service, i) => (
            <Link
              key={i}
              href={service.href}
              style={{ textDecoration: "none" }}
            >
              <div className={`card card-hover reveal ${service.delay}`}>
                {service.badge && (
                  <div className="cbadge">{service.badge}</div>
                )}
                <div className="cicon">{service.icon}</div>
                <div className="cname">{service.name}</div>
                <p className="cdesc">{service.desc}</p>
                <div className="clink">{service.link}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section avis */}
        <div style={{ padding: "24px 32px 0" }}>
          <div className="stag reveal">Ils nous font confiance</div>
          <div className="stitle reveal" style={{ marginBottom: 6 }}>
            Ce que disent nos <strong>clients</strong>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              style={{ width: 16, height: 16 }}
            />
            <span style={{ fontSize: 13, color: "var(--gray)" }}>
              Avis Google vérifiés
            </span>
            <span
              style={{
                fontSize: 13,
                color: "#F59E0B",
                letterSpacing: 1,
              }}
            >
              ★★★★★
            </span>
          </div>

          {/* Container avis (populated by client-side script or API) */}
          <div
            id="avis-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 14,
              marginBottom: 20,
            }}
          />

          <div
            style={{ textAlign: "center", marginTop: 8, paddingBottom: 32 }}
          >
            <a
              href="https://share.google/DMnd40szJ82iOlb9I"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--primary)",
                textDecoration: "none",
                padding: "11px 22px",
                border: "1.5px solid var(--primary)",
                borderRadius: 10,
                transition: "all .18s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--primary)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--primary)";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.google.com/favicon.ico"
                alt=""
                style={{ width: 15, height: 15 }}
              />
              Voir tous nos avis sur Google →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
