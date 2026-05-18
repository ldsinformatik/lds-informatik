import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const db = supabaseAdmin()

    // Ajouter à la timeline si le statut change
    const { data: current } = await db.from('demandes').select('statut, timeline').eq('id', params.id).single()
    let timeline = (current?.timeline as Array<any>) || []
    if (body.statut && body.statut !== current?.statut) {
      timeline = [...timeline, { date: new Date().toISOString(), statut: body.statut, message: `Statut mis à jour : ${body.statut}` }]
    }

    const { error } = await db.from('demandes').update({ ...body, timeline, updated_at: new Date().toISOString() }).eq('id', params.id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
