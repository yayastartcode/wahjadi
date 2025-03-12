import { getPayloadClient } from '@/payload'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    
    // Fetch the location data
    const { docs: locations } = await payload.find({
      collection: 'location',
      limit: 1,
    })
    
    const location = locations[0] || null
    
    return NextResponse.json(location)
  } catch (error) {
    console.error('Error fetching location:', error)
    return NextResponse.json({ error: 'Error fetching location' }, { status: 500 })
  }
}