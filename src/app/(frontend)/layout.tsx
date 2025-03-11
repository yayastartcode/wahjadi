import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Professional industrial products and solutions',
  title: 'Hongsen Industrial Products',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="font-sans overflow-x-hidden bg-white">
        {children}
      </body>
    </html>
  )
}
