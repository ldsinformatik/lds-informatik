import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react'

interface FooterProps { boutique: Record<string, string> }

export default function Footer({ boutique }: FooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#021634] text-white/70 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#004AAD] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xs">LDS</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">INFORMATIK</div>
                <div className="text-white/40 text-xs">Troyes, Aube</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Votre expert informatique à Troyes depuis 2023. Réparation, vente et services B2B.
            </p>
            <div className="flex gap-3">
              {boutique.facebook && (
                <a href={boutique.facebook} target="_blank" rel="noopener"
                  className="w-9 h-9 bg-white/5 hover:bg-[#004AAD] rounded-lg flex items-center justify-center transition-all">
                  <Facebook size={16} />
                </a>
              )}
              {boutique.instagram && (
                <a href={boutique.instagram} target="_blank" rel="noopener"
                  className="w-9 h-9 bg-white/5 hover:bg-[#004AAD] rounded-lg flex items-center justify-center transition-all">
                  <Instagram size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/reparer" className="hover:text-white transition-colors">Réparation smartphone</Link></li>
              <li><Link href="/reparer" className="hover:text-white transition-colors">Réparation PC/Mac</Link></li>
              <li><Link href="/acheter" className="hover:text-white transition-colors">Produits reconditionnés</Link></li>
              <li><Link href="/infogerance" className="hover:text-white transition-colors">Infogérance B2B</Link></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Entreprise</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/accueil#avis" className="hover:text-white transition-colors">Avis clients</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/espace-client/connexion" className="hover:text-white transition-colors">Espace client</Link></li>
              <li className="pt-2 border-t border-white/10">
                <span className="text-xs text-white/40">SIRET : {boutique.siret || '94895280900044'}</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin size={14} className="text-[#004AAD] flex-shrink-0 mt-0.5" />
                <span>{boutique.adresse || '145 Av. Pierre Brossolette'}, {boutique.cp || '10000'} {boutique.ville || 'Troyes'}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone size={14} className="text-[#004AAD] flex-shrink-0 mt-0.5" />
                <a href={`tel:${boutique.tel?.replace(/\s/g,'')}`} className="hover:text-white">{boutique.tel || '07 45 01 41 27'}</a>
              </li>
              <li className="flex gap-2.5">
                <Mail size={14} className="text-[#004AAD] flex-shrink-0 mt-0.5" />
                <a href={`mailto:${boutique.email}`} className="hover:text-white">{boutique.email || 'contact@ldsinformatik.fr'}</a>
              </li>
              <li className="flex gap-2.5">
                <Clock size={14} className="text-[#004AAD] flex-shrink-0 mt-0.5" />
                <div>
                  <div>Lun-Ven : 9h30-13h / 14h30-18h30</div>
                  <div>Sam : 9h30-14h</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {year} LDS INFORMATIK — Tous droits réservés</span>
          <span>Hébergé sur Vercel · Base Supabase</span>
        </div>
      </div>
    </footer>
  )
}
