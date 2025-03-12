import { getPayloadClient } from '@/payload'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    
    // Fetch the header data
    const { docs: headers } = await payload.find({
      collection: 'header',
      limit: 1,
    })
    
    const header = headers[0] || null
    
    return NextResponse.json(header)
  } catch (error) {
    console.error('Error fetching header:', error)
    return NextResponse.json({ error: 'Error fetching header' }, { status: 500 })
  }
}
