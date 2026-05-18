import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateRef } from '@/lib/utils'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { client_nom, client_email, client_tel, client_id, produit_id, produit_nom, produit_prix, message } = body
    const ref = generateRef('RES')

    const db = supabaseAdmin()
    const { data, error } = await db.from('reservations').insert({
      ref, client_nom, client_email, client_tel: client_tel || null,
      client_id: client_id || null, produit_id, produit_nom, produit_prix,
      message: message || null, statut: 'nouvelle',
    }).select().single()

    if (error) throw error

    // Notifications email
    try {
      await resend.emails.send({
        from: 'LDS INFORMATIK <noreply@ldsinformatik.fr>',
        to: [process.env.NOTIFICATION_EMAIL || 'contact@ldsinformatik.fr'],
        replyTo: client_email,
        subject: `🛍 Réservation produit — ${ref}`,
        html: `<div style="font-family:sans-serif;max-width:600px;">
          <h2>Nouvelle réservation — ${ref}</h2>
          <p><strong>Produit :</strong> ${produit_nom} — ${produit_prix}€</p>
          <p><strong>Client :</strong> ${client_nom}</p>
          <p><strong>Email :</strong> ${client_email}</p>
          <p><strong>Tel :</strong> ${client_tel || '—'}</p>
          ${message ? `<p><strong>Message :</strong> ${message}</p>` : ''}
        </div>`,
      })
      await resend.emails.send({
        from: 'LDS INFORMATIK <noreply@ldsinformatik.fr>',
        to: [client_email],
        subject: `✅ Réservation confirmée — Réf. ${ref}`,
        html: `<div style="font-family:sans-serif;max-width:600px;">
          <h2>Votre réservation est enregistrée !</h2>
          <p>Bonjour ${client_nom},</p>
          <p>Nous avons bien reçu votre réservation pour <strong>${produit_nom}</strong> (Réf. ${ref}).</p>
          <p>Nous vous contacterons dans les 2h pour confirmer et organiser le retrait en boutique.</p>
          <p><em>Aucun paiement en ligne. Vous réglez directement lors du retrait.</em></p>
          <br><p>Bien cordialement,<br><strong>LDS INFORMATIK</strong><br>07 45 01 41 27</p>
        </div>`,
      })
    } catch (e) { console.error('Email error:', e) }

    return NextResponse.json({ success: true, ref, id: data.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  const db = supabaseAdmin()
  const { data, error } = await db.from('reservations').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
