import { getPayloadClient } from '@/payload'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    
    // Fetch the about-us data
    const { docs: aboutUsData } = await payload.find({
      collection: 'about-us',
      limit: 1,
    })
    
    const aboutUs = aboutUsData[0] || null
    
    // Format the content field to handle rich text data
    if (aboutUs && aboutUs.content) {
      const formattedContent = aboutUs.content.root.children.map((paragraph: any) => {
        if (paragraph.type === 'paragraph') {
          return paragraph.children.map((child: any) => {
            if (child.type === 'text') return child.text
            if (child.type === 'linebreak') return '\n'
            return ''
          }).join('')
        }
        return ''
      }).join('\n\n')
      aboutUs.content = formattedContent.trim()
    }
    
    return NextResponse.json(aboutUs)
  } catch (error) {
    console.error('Error fetching about-us data:', error)
    return NextResponse.json({ error: 'Error fetching about-us data' }, { status: 500 })
  }
}