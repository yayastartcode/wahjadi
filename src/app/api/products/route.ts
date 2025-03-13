import { getPayloadClient } from '@/payload'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const payload = await getPayloadClient()
    const { searchParams } = new URL(request.url)
    const whereQuery = searchParams.get('where[slug][equals]')
    
    if (whereQuery) {
      // Fetch single product by slug
      const { docs } = await payload.find({
        collection: 'products',
        where: {
          slug: { equals: whereQuery }
        },
      })
      return NextResponse.json(docs[0] || null)
    }
    
    // Fetch all products when no query is provided
    const { docs } = await payload.find({
      collection: 'products',
      limit: 100,
    })
    
    return NextResponse.json(docs)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
}