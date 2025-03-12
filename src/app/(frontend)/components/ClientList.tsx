import React from 'react'
import Image from 'next/image'

const ClientList = () => {
  // Client data with logos
  const clients = [
    { id: 1, name: 'BCA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png' },
    { id: 2, name: 'Pertamina', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Pertamina_logo.svg/2560px-Pertamina_logo.svg.png' },
    { id: 3, name: 'PLN', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_PLN.png' },
    { id: 4, name: 'MNC Pictures', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/MNC_Pictures.svg/2560px-MNC_Pictures.svg.png' },
    { id: 5, name: 'RCTI', logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/d/dd/RCTI_logo_2015.svg/1280px-RCTI_logo_2015.svg.png' },
    { id: 6, name: 'Mitsubishi Motors', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_Motors_logo.svg/2560px-Mitsubishi_Motors_logo.svg.png' },
    { id: 7, name: 'Telkomsel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Telkomsel_2021_icon.svg/2048px-Telkomsel_2021_icon.svg.png' },
    { id: 8, name: 'Shinhan Securities', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Shinhan_Financial_Group_logo.svg/1200px-Shinhan_Financial_Group_logo.svg.png' },
    { id: 9, name: 'Grapelindo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Grab_Logo.svg/2560px-Grab_Logo.svg.png' },
    { id: 10, name: 'Nestle', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nestl%C3%A9.svg/2560px-Nestl%C3%A9.svg.png' },
    { id: 11, name: 'Newmont', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Newmont_Corporation_Logo.svg/1200px-Newmont_Corporation_Logo.svg.png' },
    { id: 12, name: 'NYK Group', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/NYK_Line_logo.svg/2560px-NYK_Line_logo.svg.png' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold inline-block">
            Our <span className="text-green-600">Clients</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {clients.map(client => (
            <div 
              key={client.id} 
              className="border border-gray-200 rounded-md p-4 flex items-center justify-center h-40 transition-all hover:shadow-md"
            >
              <div className="relative w-full h-full">
                <Image 
                  src={client.logo} 
                  alt={`${client.name} logo`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
                  style={{ objectFit: 'contain' }}
                  className="p-2"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientList
