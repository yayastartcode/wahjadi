import { getPayloadClient } from '@/payload'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    
    // Fetch the products data
    const { docs: products } = await payload.find({
      collection: 'products',
      where: {
        featured: { equals: true }
      },
      limit: 100,
    })
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
}