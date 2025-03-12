import { getPayloadClient } from '@/payload'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    
    // Fetch the company-values data
    const { docs: companyValuesData } = await payload.find({
      collection: 'company-values',
      limit: 1,
    })
    
    const companyValues = companyValuesData[0] || null
    
    return NextResponse.json(companyValues)
  } catch (error) {
    console.error('Error fetching company values:', error)
    return NextResponse.json({ error: 'Error fetching company values' }, { status: 500 })
  }
}