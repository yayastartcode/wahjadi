"use client";

import React, { useState, useEffect } from 'react'

interface LocationData {
  title: string;
  description?: string;
  mapEmbedUrl: string;
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
}

const LocationMap = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [siteSettings, setSiteSettings] = useState<{ contactInfo: { whatsapp?: string } } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationResponse, settingsResponse] = await Promise.all([
          fetch('/api/location'),
          fetch('/api/site-settings')
        ]);

        if (!locationResponse.ok) {
          throw new Error('Failed to fetch location data');
        }
        if (!settingsResponse.ok) {
          throw new Error('Failed to fetch site settings');
        }

        const [locationData, settingsData] = await Promise.all([
          locationResponse.json(),
          settingsResponse.json()
        ]);

        setLocationData(locationData);
        setSiteSettings(settingsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback location data in case CMS data is not available
  const fallbackLocation = {
    title: 'Our Location',
    description: 'Visit our facility in Rudong, Jiangsu province, China. Our plant is located around 200 km away from Shanghai, covering an area of 64,000 square meters.',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.3514956665463!2d121.0778!3d31.9139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU0JzUwLjAiTiAxMjHCsDA0JzQwLjEiRQ!5e0!3m2!1sen!2sus!4v1615301717693!5m2!1sen!2sus',
    address: 'Rudong, Jiangsu province, China',
    phone: '+86 123 456 7890',
    email: 'info@hongsen.com'
  };

  // Use CMS data if available, otherwise use fallback
  const displayLocation = locationData || fallbackLocation;
  const whatsappNumber = siteSettings?.contactInfo?.whatsapp;

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold inline-block">
              Our <span className="text-red-600">Location</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse text-gray-500">Loading location data...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error in LocationMap component:', error);
    // Continue with fallback location
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold inline-block">
            Our <span className="text-red-600">Location</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            {displayLocation.description}
          </p>
        </div>
        
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-md">
          <iframe 
            src={displayLocation.mapEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Company Location Map"
            className="w-full h-full"
            aria-label="Google Maps showing our company location"
          />
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="mr-4 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Address</h3>
              <p className="text-gray-600">{displayLocation.address}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="mr-4 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">{displayLocation.phone}</p>
            </div>
          </div>
          
          {whatsappNumber && (
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
              <div className="mr-4 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.88 5.83L2.2 22l4.17-1.68C7.71 21.38 9.82 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-2.03 0-3.93-.61-5.5-1.65l-.39-.23-2.62 1.05.91-2.72-.25-.4C3.39 15.03 3 13.57 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9zm5.18-12.24c-.12-.18-.44-.33-.92-.57-.48-.24-2.82-1.39-3.26-1.55-.43-.16-.74-.24-1.05.24-.31.48-1.2 1.55-1.47 1.87-.27.31-.54.35-1 .11-.46-.24-1.95-.72-3.72-2.29-1.37-1.22-2.3-2.73-2.57-3.19-.27-.46-.03-.71.2-.94.21-.21.46-.55.69-.82.23-.28.3-.48.46-.8.15-.31.07-.58-.04-.82-.11-.24-.99-2.39-1.36-3.27-.36-.87-.72-.75-.99-.76-.25-.02-.55-.02-.84-.02-.29 0-.77.11-1.17.55-.4.44-1.54 1.5-1.54 3.67 0 2.17 1.58 4.27 1.8 4.56.22.3 3.17 4.85 7.69 6.8 1.07.46 1.91.74 2.56.95.93.29 1.77.25 2.44.15.74-.11 2.28-.93 2.6-1.83.32-.9.32-1.67.22-1.83z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                <a 
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600"
                >
                  {whatsappNumber}
                </a>
              </div>
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="mr-4 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">{displayLocation.email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationMap
