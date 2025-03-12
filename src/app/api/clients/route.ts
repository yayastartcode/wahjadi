import { getPayloadClient } from '@/payload'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    if (!payload) {
      throw new Error('Failed to initialize Payload client')
    }

    // Fetch the clients data
    const clients = await payload.find({
      collection: 'clients',
      sort: 'order',
      limit: 100,
    })

    if (!clients || !clients.docs) {
      throw new Error('No clients data received from database')
    }

    return NextResponse.json(clients.docs)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { 
        error: 'Error fetching clients', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}