import React from 'react'
import './styles.css'

export const metadata = {
  description: 'PT Wahana Jaya Dinamika - Motor & Pneumatic Vibrator Specialist PT Wahjadi CONCRETE INTERNAL VIBRATOr MOTOR & GEAR BOX RUBBER SUSPENSION',
  title: 'PT Wahana Jaya Dinamika - Motor & Pneumatic Vibrator Specialist',
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
