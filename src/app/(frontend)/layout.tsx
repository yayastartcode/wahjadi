"use client";

import React, { useState, useEffect } from 'react'
import './styles.css'

export const metadata = {
  description: 'PT Wahana Jaya Dinamika - Motor & Pneumatic Vibrator Specialist PT Wahjadi CONCRETE INTERNAL VIBRATOr MOTOR & GEAR BOX RUBBER SUSPENSION',
  title: 'PT Wahana Jaya Dinamika - Motor & Pneumatic Vibrator Specialist',
  robots:'index,follow',
}

const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (!response.ok) {
          throw new Error('Failed to fetch site settings');
        }
        const data = await response.json();
        if (data.contactInfo?.whatsapp) {
          setWhatsappNumber(data.contactInfo.whatsapp);
        }
      } catch (err) {
        console.error('Error fetching site settings:', err);
      }
    };

    fetchSiteSettings();
  }, []);

  if (!whatsappNumber) return null;

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.88 5.83L2.2 22l4.17-1.68C7.71 21.38 9.82 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-2.03 0-3.93-.61-5.5-1.65l-.39-.23-2.62 1.05.91-2.72-.25-.4C3.39 15.03 3 13.57 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9zm5.18-12.24c-.12-.18-.44-.33-.92-.57-.48-.24-2.82-1.39-3.26-1.55-.43-.16-.74-.24-1.05.24-.31.48-1.2 1.55-1.47 1.87-.27.31-.54.35-1 .11-.46-.24-1.95-.72-3.72-2.29-1.37-1.22-2.3-2.73-2.57-3.19-.27-.46-.03-.71.2-.94.21-.21.46-.55.69-.82.23-.28.3-.48.46-.8.15-.31.07-.58-.04-.82-.11-.24-.99-2.39-1.36-3.27-.36-.87-.72-.75-.99-.76-.25-.02-.55-.02-.84-.02-.29 0-.77.11-1.17.55-.4.44-1.54 1.5-1.54 3.67 0 2.17 1.58 4.27 1.8 4.56.22.3 3.17 4.85 7.69 6.8 1.07.46 1.91.74 2.56.95.93.29 1.77.25 2.44.15.74-.11 2.28-.93 2.6-1.83.32-.9.32-1.67.22-1.83z"
        />
      </svg>
    </a>
  )
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="font-sans overflow-x-hidden bg-white">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
