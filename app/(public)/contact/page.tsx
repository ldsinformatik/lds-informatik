"use client";

import { useEffect, useRef } from "react";

export default function ContactPage() {
  // Animate elements on scroll
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="contact-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <style>{`
        :root {
          --primary: #004AAD;
          --secondary: #162a68;
          --light: #d8e9ff;
          --white: #fff;
          --text: #1a1a1a;
          --gray: #6b7280;
          --border: #e5e7eb;
          --bg: #f7faff;
          --shadow: 0 10px 30px rgba(0,0,0,0.07);
          --radius: 20px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .card-hover {
          transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,74,173,.13);
        }

        @keyframes bl { 0%,100%{opacity:1} 50%{opacity:.2} }
        .urg-dot { animation: bl 1.5s infinite; }

        .contact-info-link {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 14px 16px;
          background: var(--light);
          border-radius: 12px;
          border: 1.5px solid rgba(0,74,173,.1);
          transition: all .18s;
        }
        .contact-info-link:hover {
          background: var(--primary);
          color: #fff;
        }
        .contact-info-link:hover .ci-label {
          color: rgba(255,255,255,.8) !important;
        }
        .contact-info-link:hover .ci-value {
          color: #fff !important;
        }

        .stag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .1em;
          color: var(--primary);
          font-weight: 700;
          margin-bottom: 8px;
        }
        .stitle {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--secondary);
        }
        .stitle strong { color: var(--primary); }
        .ssub {
          font-size: 13.5px;
          color: var(--gray);
          margin-top: 6px;
        }

        .card {
          background: #fff;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          border: 1px solid rgba(0,0,0,.04);
        }

        @media (max-width: 900px) {
          .contact-main-grid { grid-template-columns: 1fr !important; }
          .contact-main-grid > div:last-child { min-height: 320px !important; }
          .contact-badges-grid { grid-template-columns: repeat(2,1fr) !important; padding: 16px !important; }
          .contact-phone-email { grid-template-columns: 1fr !important; gap: 10px !important; }
        }
        @media (max-width: 560px) {
          .contact-badges-grid { grid-template-columns: repeat(2,1fr) !important; }
          .sh-padding { padding: 28px 16px 20px !important; }
          .contact-left-padding { padding: 24px 16px !important; }
        }
      `}</style>

      {/* ── Section Header ── */}
      <div
        className="sh-padding"
        style={{
          background: "var(--bg)",
          borderBottom: "none",
          padding: "56px 32px 40px",
        }}
      >
        <div className="stag reveal">Nous contacter</div>
        <div className="stitle reveal">
          Un accompagnement de <strong>proximité</strong>
        </div>
        <div
          className="ssub"
          style={{ marginTop: 10, maxWidth: 520 }}
        >
          Besoin d'un dépannage, d'un conseil ou d'un accompagnement IT ?
          On vous accueille directement en boutique à Troyes sans rendez-vous.
        </div>
      </div>

      {/* ── Layout principal : gauche infos / droite carte ── */}
      <div
        className="contact-main-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          maxWidth: "100%",
          alignItems: "stretch",
        }}
      >
        {/* Colonne gauche : infos + carte */}
        <div
          className="contact-left-padding"
          style={{
            padding: "48px 48px",
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {/* Adresse */}
          <div className="card card-hover reveal" style={{ padding: "32px 28px" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                color: "var(--primary)",
                marginBottom: 18,
              }}
            >
              📍 Notre boutique
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--secondary)",
                marginBottom: 4,
              }}
            >
              LDS INFORMATIK
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--gray)",
                lineHeight: 1.8,
              }}
            >
              145 Avenue Pierre Brossolette
              <br />
              10000 Troyes, France
            </div>
            <a
              href="https://maps.google.com/?q=145+Avenue+Pierre+Brossolette,+10000+Troyes"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 12,
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--primary)",
                textDecoration: "none",
              }}
              onMouseOver={(e) =>
                ((e.target as HTMLElement).style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLElement).style.textDecoration = "none")
              }
            >
              🗺 Ouvrir dans Google Maps →
            </a>
          </div>

          {/* Téléphone / Email */}
          <div
            className="card card-hover reveal contact-phone-email"
            style={{
              padding: "32px 28px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <a href="tel:0745014127" className="contact-info-link">
              <span style={{ fontSize: 18 }}>📞</span>
              <span
                className="ci-label"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--primary)",
                }}
              >
                Téléphone
              </span>
              <span
                className="ci-value"
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "var(--secondary)",
                }}
              >
                07 45 01 41 27
              </span>
            </a>
            <a href="mailto:contact@ldsinformatik.fr" className="contact-info-link">
              <span style={{ fontSize: 18 }}>✉️</span>
              <span
                className="ci-label"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--primary)",
                }}
              >
                Email
              </span>
              <span
                className="ci-value"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--secondary)",
                }}
              >
                contact@ldsinformatik.fr
              </span>
            </a>
          </div>

          {/* Horaires */}
          <div className="card card-hover reveal" style={{ padding: "32px 28px" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                color: "var(--primary)",
                marginBottom: 18,
              }}
            >
              🕒 Horaires d&apos;ouverture
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  background: "var(--light)",
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--secondary)",
                  }}
                >
                  Lundi - Vendredi
                </span>
                <span style={{ fontSize: 13, color: "var(--gray)" }}>
                  9h30 - 13h &nbsp;·&nbsp; 14h30 – 18h30
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  background: "var(--light)",
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--secondary)",
                  }}
                >
                  Samedi
                </span>
                <span style={{ fontSize: 13, color: "var(--gray)" }}>
                  9h30 - 14h00
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: 8,
                  opacity: 0.5,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--secondary)",
                  }}
                >
                  Dimanche
                </span>
                <span style={{ fontSize: 13, color: "var(--gray)" }}>
                  Fermé
                </span>
              </div>
            </div>
          </div>

          {/* Assistance à distance TeamViewer */}
          <div
            className="card card-hover reveal"
            style={{
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 28 }}>🖥</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--secondary)",
                  marginBottom: 3,
                }}
              >
                Assistance à distance
              </div>
              <div style={{ fontSize: 12.5, color: "var(--gray)" }}>
                Prise en main à distance via TeamViewer
              </div>
            </div>
            <a
              href="https://get.teamviewer.com/ldsinformatik"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flexShrink: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                background: "var(--primary)",
                padding: "9px 16px",
                borderRadius: 10,
                textDecoration: "none",
                transition: "background .18s",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--secondary)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--primary)")
              }
            >
              Se connecter →
            </a>
          </div>
        </div>

        {/* Colonne droite : carte Google Maps */}
        <div
          style={{
            position: "relative",
            minHeight: 600,
            background: "#e8edf2",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.8227819451736!2d4.074900377189931!3d48.287025171260396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d2d523f4553%3A0x522b29ed194a4b68!2sLDS%20INFORMATIK!5e0!3m2!1sfr!2sfr!4v1778912457405!5m2!1sfr!2sfr"
            style={{
              width: "100%",
              height: "100%",
              minHeight: 600,
              border: "none",
              display: "block",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="LDS Informatik - 145 Avenue Pierre Brossolette, Troyes"
          />
          {/* Badge sur la carte */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "#fff",
              borderRadius: 12,
              padding: "12px 16px",
              boxShadow: "0 4px 20px rgba(0,0,0,.15)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              📍
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--secondary)",
                }}
              >
                LDS INFORMATIK
              </div>
              <div style={{ fontSize: 11, color: "var(--gray)" }}>
                145 Av. Pierre Brossolette
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Formulaire de demande ── */}
      <div
        style={{
          background: "#fff",
          borderTop: "1px solid var(--border)",
          padding: "40px 32px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              color: "var(--primary)",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Formulaire de demande
          </p>

          {/* Prénom / Société */}
          <div
            className="fr2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 0,
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--primary)",
                  display: "block",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Prénom
              </label>
              <input
                type="text"
                placeholder="Jean"
                style={{
                  width: "100%",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  padding: "10px 13px",
                  borderRadius: 10,
                  outline: "none",
                  marginBottom: 14,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--primary)";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)";
                  e.target.style.background = "var(--bg)";
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--primary)",
                  display: "block",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Société
              </label>
              <input
                type="text"
                placeholder="Mon entreprise"
                style={{
                  width: "100%",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  padding: "10px 13px",
                  borderRadius: 10,
                  outline: "none",
                  marginBottom: 14,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--primary)";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)";
                  e.target.style.background = "var(--bg)";
                }}
              />
            </div>
          </div>

          {/* Email */}
          <label
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".08em",
              color: "var(--primary)",
              display: "block",
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            Email professionnel
          </label>
          <input
            type="email"
            placeholder="jean@monentreprise.fr"
            style={{
              width: "100%",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              padding: "10px 13px",
              borderRadius: 10,
              outline: "none",
              marginBottom: 14,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--primary)";
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.background = "var(--bg)";
            }}
          />

          {/* Téléphone */}
          <label
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".08em",
              color: "var(--primary)",
              display: "block",
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            Téléphone
          </label>
          <input
            type="tel"
            placeholder="06 00 00 00 00"
            style={{
              width: "100%",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              padding: "10px 13px",
              borderRadius: 10,
              outline: "none",
              marginBottom: 14,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--primary)";
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.background = "var(--bg)";
            }}
          />

          {/* Service souhaité */}
          <label
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".08em",
              color: "var(--primary)",
              display: "block",
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            Service souhaité
          </label>
          <select
            style={{
              width: "100%",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              padding: "10px 13px",
              borderRadius: 10,
              outline: "none",
              marginBottom: 14,
              cursor: "pointer",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--primary)";
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.background = "var(--bg)";
            }}
          >
            <option value="">Sélectionner un service…</option>
            <option>Dépannage & Réparation</option>
            <option>PC sur mesure</option>
            <option>Achat de matériel</option>
            <option>Infogérance, Cloud & Sécurité</option>
          </select>

          {/* Message */}
          <label
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".08em",
              color: "var(--primary)",
              display: "block",
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            Message
          </label>
          <textarea
            placeholder="Décrivez votre situation ou votre projet…"
            style={{
              width: "100%",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              padding: "10px 13px",
              borderRadius: 10,
              outline: "none",
              marginBottom: 14,
              height: 78,
              resize: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--primary)";
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.background = "var(--bg)";
            }}
          />

          {/* Bouton envoi */}
          <button
            style={{
              width: "100%",
              fontSize: 13.5,
              fontWeight: 700,
              color: "#fff",
              background: "var(--primary)",
              border: "none",
              padding: 13,
              borderRadius: 12,
              cursor: "pointer",
              boxShadow: "0 6px 16px rgba(0,74,173,.22)",
              transition: "all .2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--secondary)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
              (e.currentTarget as HTMLButtonElement).style.transform = "";
            }}
          >
            Envoyer ma demande - Réponse sous 2h
          </button>
        </div>
      </div>
    </div>
  );
}
