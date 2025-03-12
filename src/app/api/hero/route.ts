import { getPayloadClient } from '@/payload'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    
    // Fetch the hero data
    const { docs: heroes } = await payload.find({
      collection: 'hero',
      limit: 1,
    })
    
    const hero = heroes[0] || null
    
    return NextResponse.json(hero)
  } catch (error) {
    console.error('Error fetching hero:', error)
    return NextResponse.json({ error: 'Error fetching hero' }, { status: 500 })
  }
}
