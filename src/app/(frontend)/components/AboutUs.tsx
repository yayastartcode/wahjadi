import React from 'react'
import Image from 'next/image'

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What we do?</h2>
        
        <p className="text-center max-w-4xl mx-auto mb-12 text-gray-600">
          Our plant is located in Rudong, Jiangsu province, China, around 200 km away from Shanghai, covering an area of 64,000 square meters with around 100 skilled workers, R&D staffs and administrators.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left Content Box */}
          <div className="bg-gray-200 p-8 rounded-lg md:w-1/2">
            <h3 className="font-semibold text-xl mb-4">Rudong Hongxin Machinery Co.,Ltd</h3>
            
            <div className="w-48 h-1 bg-blue-500 mb-6"></div>
            
            <p className="mb-6">
              At present, there are about 300 corporate customers, such as US GE Gringer, Actuant, Kennametal, Universal Equipment. At the same time we have obtained a series of qualifications, such as GE Tier 1 suppliers, China Classification Society, CE, SGS, etc.
            </p>
            
            <button className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-colors">
              Read More
            </button>
          </div>
          
          {/* Right Image */}
          <div className="md:w-1/2 relative h-[300px] md:h-[400px]">
            <Image 
              src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2000&auto=format&fit=crop" 
              alt="Factory building" 
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
