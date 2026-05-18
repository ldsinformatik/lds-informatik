import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateRef } from '@/lib/utils'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, client_id, client_nom, nom, client_email, email, client_tel, tel, ...rest } = body

    const ref = generateRef(type === 'reparation' ? 'REP' : type === 'pc_sur_mesure' ? 'PC' : type === 'infogerance' ? 'IG' : 'CTT')

    const db = supabaseAdmin()
    const { data, error } = await db.from('demandes').insert({
      ref,
      type,
      client_id: client_id || null,
      client_nom: client_nom || nom || 'Inconnu',
      client_email: client_email || email || '',
      client_tel: client_tel || tel || null,
      statut: 'nouveau',
      timeline: [{ date: new Date().toISOString(), statut: 'nouveau', message: 'Demande reçue' }],
      ...rest,
    }).select().single()

    if (error) throw error

    // Email notification
    try {
      const sujetMap: Record<string, string> = {
        reparation: `🔧 Réparation — Nouvelle demande ${ref}`,
        pc_sur_mesure: `💻 PC sur mesure — Nouvelle demande ${ref}`,
        infogerance: `🏢 Infogérance — Nouvelle demande ${ref}`,
        contact: `📍 Contact — Nouveau message ${ref}`,
      }
      await resend.emails.send({
        from: 'LDS INFORMATIK <noreply@ldsinformatik.fr>',
        to: [process.env.NOTIFICATION_EMAIL || 'contact@ldsinformatik.fr'],
        cc: process.env.NOTIFICATION_EMAIL_CC ? [process.env.NOTIFICATION_EMAIL_CC] : [],
        replyTo: client_email || email,
        subject: sujetMap[type] || `Nouvelle demande ${ref}`,
        html: `
          <div style="font-family:DM Sans,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#004AAD;padding:20px 24px;border-radius:12px 12px 0 0;">
              <h2 style="color:#fff;margin:0;font-size:18px;">Nouvelle demande — ${ref}</h2>
            </div>
            <div style="background:#fff;border:1px solid #e2e8f0;padding:24px;border-radius:0 0 12px 12px;">
              <p><strong>Type :</strong> ${type}</p>
              <p><strong>Client :</strong> ${client_nom || nom}</p>
              <p><strong>Email :</strong> ${client_email || email}</p>
              <p><strong>Téléphone :</strong> ${client_tel || tel || '—'}</p>
              ${rest.appareil ? `<p><strong>Appareil :</strong> ${rest.appareil} ${rest.marque || ''} ${rest.modele || ''}</p>` : ''}
              ${rest.prestations ? `<p><strong>Prestation(s) :</strong> ${Array.isArray(rest.prestations) ? rest.prestations.join(', ') : rest.prestations}</p>` : ''}
              ${rest.message || rest.besoins ? `<p><strong>Message :</strong> ${rest.message || rest.besoins}</p>` : ''}
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
              <p style="font-size:12px;color:#64748b;">Répondre directement à cet email pour contacter le client.</p>
            </div>
          </div>`,
      })

      // Accusé réception client
      await resend.emails.send({
        from: 'LDS INFORMATIK <noreply@ldsinformatik.fr>',
        to: [client_email || email],
        subject: `✅ Demande reçue — Réf. ${ref}`,
        html: `
          <div style="font-family:DM Sans,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#004AAD;padding:20px 24px;border-radius:12px 12px 0 0;">
              <h2 style="color:#fff;margin:0;">Votre demande a bien été reçue</h2>
            </div>
            <div style="background:#fff;border:1px solid #e2e8f0;padding:24px;border-radius:0 0 12px 12px;">
              <p>Bonjour ${client_nom || nom},</p>
              <p>Nous avons bien reçu votre demande (Réf. <strong>${ref}</strong>).</p>
              <p>Nous vous contacterons dans un délai de <strong>2h</strong>.</p>
              <br>
              <p>Bien cordialement,<br><strong>L'équipe LDS INFORMATIK</strong></p>
              <p style="font-size:12px;color:#64748b;">07 45 01 41 27 · contact@ldsinformatik.fr · 145 Av. Pierre Brossolette, 10000 Troyes</p>
            </div>
          </div>`,
      })
    } catch (emailErr) {
      console.error('Email error:', emailErr)
      // On ne bloque pas si l'email échoue
    }

    return NextResponse.json({ success: true, ref, id: data.id })
  } catch (error: any) {
    console.error('Demande error:', error)
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Protégé côté admin via middleware
  const db = supabaseAdmin()
  const { data, error } = await db.from('demandes').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
