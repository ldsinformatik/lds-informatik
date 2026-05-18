import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(date))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

export function generateRef(prefix: string) {
  const date = new Date().toISOString().slice(0,10).replace(/-/g,'')
  const rand = Math.random().toString(36).substring(2,6).toUpperCase()
  return `${prefix}-${date}-${rand}`
}

export function statutLabel(statut: string) {
  const map: Record<string, string> = {
    nouveau: 'Nouveau', en_attente: 'En attente', en_cours: 'En cours',
    termine: 'Terminé', annule: 'Annulé',
    nouvelle: 'Nouvelle', confirmée: 'Confirmée', annulée: 'Annulée', récupérée: 'Récupérée'
  }
  return map[statut] || statut
}

export function statutColor(statut: string) {
  const map: Record<string, string> = {
    nouveau: 'bg-red-100 text-red-700',
    nouvelle: 'bg-red-100 text-red-700',
    en_attente: 'bg-amber-100 text-amber-700',
    en_cours: 'bg-blue-100 text-blue-700',
    confirmée: 'bg-blue-100 text-blue-700',
    termine: 'bg-green-100 text-green-700',
    récupérée: 'bg-green-100 text-green-700',
    annule: 'bg-gray-100 text-gray-600',
    annulée: 'bg-gray-100 text-gray-600',
  }
  return map[statut] || 'bg-gray-100 text-gray-600'
}

export function isOpen(horaires: Array<{jour: string; ouvert: boolean; matin: string; aprem: string}>) {
  const jours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
  const now = new Date()
  const jourActuel = jours[now.getDay()]
  const horaire = horaires.find(h => h.jour === jourActuel)
  if (!horaire || !horaire.ouvert) return false

  const heure = now.getHours() * 60 + now.getMinutes()
  const parseRange = (range: string) => {
    if (!range) return null
    const [start, end] = range.split('-').map(t => {
      const [h, m] = t.split(':').map(Number)
      return h * 60 + m
    })
    return { start, end }
  }

  const matin = parseRange(horaire.matin)
  const aprem = parseRange(horaire.aprem)
  if (matin && heure >= matin.start && heure <= matin.end) return true
  if (aprem && heure >= aprem.start && heure <= aprem.end) return true
  return false
}
