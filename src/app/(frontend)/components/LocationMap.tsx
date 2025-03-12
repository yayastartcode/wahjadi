"use client";

import React, { useState, useEffect } from 'react'

interface LocationData {
  title: string;
  description?: string;
  mapEmbedUrl: string;
  address: string;
  phone: string;
  email: string;
}

const LocationMap = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch('/api/location');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        setLocationData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching location data:', err);
        setError('Failed to load location data');
        setLoading(false);
      }
    };

    fetchLocationData();
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
