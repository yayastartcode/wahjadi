import { getPayloadClient } from '@/payload'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    
    // Fetch the site settings data
    const { docs: siteSettings } = await payload.find({
      collection: 'site-settings',
      limit: 1,
    })
    
    const settings = siteSettings[0] || null
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json({ error: 'Error fetching site settings' }, { status: 500 })
  }
}