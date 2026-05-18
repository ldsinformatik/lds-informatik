export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; email: string; nom: string | null; prenom: string | null; telephone: string | null; entreprise: string | null; created_at: string; updated_at: string }
        Insert: { id: string; email: string; nom?: string; prenom?: string; telephone?: string; entreprise?: string }
        Update: { nom?: string; prenom?: string; telephone?: string; entreprise?: string }
      }
      tarifs: {
        Row: { id: string; categorie: string; ico: string; nom: string; description: string | null; prix_min: number; prix_max: number; visible: boolean; ordre: number; created_at: string }
        Insert: { categorie: string; ico?: string; nom: string; description?: string; prix_min?: number; prix_max?: number; visible?: boolean; ordre?: number }
        Update: { categorie?: string; ico?: string; nom?: string; description?: string; prix_min?: number; prix_max?: number; visible?: boolean; ordre?: number }
      }
      produits: {
        Row: { id: string; categorie: string; marque: string | null; nom: string; description: string | null; prix: number; etat: string; specs: string[]; images: string[]; stock: number; visible: boolean; ordre: number; created_at: string; updated_at: string }
        Insert: { categorie: string; marque?: string; nom: string; description?: string; prix: number; etat?: string; specs?: string[]; images?: string[]; stock?: number; visible?: boolean; ordre?: number }
        Update: { categorie?: string; marque?: string; nom?: string; description?: string; prix?: number; etat?: string; specs?: string[]; images?: string[]; stock?: number; visible?: boolean; ordre?: number }
      }
      reservations: {
        Row: { id: string; ref: string; client_id: string | null; client_nom: string; client_email: string; client_tel: string | null; produit_id: string | null; produit_nom: string; produit_prix: number; message: string | null; statut: string; notes_admin: string | null; created_at: string; updated_at: string }
        Insert: { ref: string; client_id?: string; client_nom: string; client_email: string; client_tel?: string; produit_id?: string; produit_nom: string; produit_prix: number; message?: string }
        Update: { statut?: string; notes_admin?: string }
      }
      demandes: {
        Row: { id: string; ref: string; type: string; client_id: string | null; client_nom: string; client_email: string; client_tel: string | null; entreprise: string | null; appareil: string | null; marque: string | null; modele: string | null; prestations: string[] | null; budget: string | null; usage: string | null; nb_postes: string | null; besoins: string | null; message: string | null; statut: string; notes_admin: string | null; timeline: Json; created_at: string; updated_at: string }
        Insert: { ref: string; type: string; client_id?: string; client_nom: string; client_email: string; client_tel?: string; entreprise?: string; appareil?: string; marque?: string; modele?: string; prestations?: string[]; budget?: string; usage?: string; nb_postes?: string; besoins?: string; message?: string }
        Update: { statut?: string; notes_admin?: string; timeline?: Json }
      }
      avis: {
        Row: { id: string; nom: string; note: number; date_texte: string | null; contenu: string; actif: boolean; ordre: number; created_at: string }
        Insert: { nom: string; note: number; date_texte?: string; contenu: string; actif?: boolean; ordre?: number }
        Update: { nom?: string; note?: number; date_texte?: string; contenu?: string; actif?: boolean; ordre?: number }
      }
      faq: {
        Row: { id: string; question: string; reponse: string; visible: boolean; ordre: number }
        Insert: { question: string; reponse: string; visible?: boolean; ordre?: number }
        Update: { question?: string; reponse?: string; visible?: boolean; ordre?: number }
      }
      partenaires: {
        Row: { id: string; nom: string; logo: string | null; url: string | null; ordre: number; actif: boolean }
        Insert: { nom: string; logo?: string; url?: string; ordre?: number; actif?: boolean }
        Update: { nom?: string; logo?: string; url?: string; ordre?: number; actif?: boolean }
      }
      config: {
        Row: { cle: string; valeur: Json; updated_at: string }
        Insert: { cle: string; valeur: Json }
        Update: { valeur?: Json }
      }
    }
  }
}

// Types utilitaires
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Tarif = Database['public']['Tables']['tarifs']['Row']
export type Produit = Database['public']['Tables']['produits']['Row']
export type Reservation = Database['public']['Tables']['reservations']['Row']
export type Demande = Database['public']['Tables']['demandes']['Row']
export type Avis = Database['public']['Tables']['avis']['Row']
export type Faq = Database['public']['Tables']['faq']['Row']
export type Partenaire = Database['public']['Tables']['partenaires']['Row']
