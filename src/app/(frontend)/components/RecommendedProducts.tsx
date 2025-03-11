import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Product card component
const ProductCard = ({ 
  image, 
  title,
  link = '#'
}: { 
  image: string, 
  title: string,
  link?: string
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
      <Link href={link} className="block">
        <div className="relative h-64 w-full">
          <Image 
            src={image} 
            alt={title}
            fill
            style={{ objectFit: 'contain' }}
            className="p-4"
          />
        </div>
        <div className="p-4 text-center border-t">
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
      </Link>
    </div>
  )
}

const RecommendedProducts = () => {
  // Product data
  const products = [
    {
      id: 1,
      title: 'Air Motor',
      image: 'https://www.depragusa.com/files/images/products/pneumatic-motors/basic-line-stainless-steel-motors-700x700.png',
      link: '/products/air-motor'
    },
    {
      id: 2,
      title: 'Air Winch',
      image: 'https://www.ingersollrand.com/content/dam/ir-na/northern-america/products/lifting/air-winches/Utility-Winch/IR-Utility-Winch-700x700.jpg',
      link: '/products/air-winch'
    },
    {
      id: 3,
      title: 'Air Mixer',
      image: 'https://www.depragusa.com/files/images/products/air-motors/mixer-drives-700x700.png',
      link: '/products/air-mixer'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recommended Products</h2>
            <div className="w-16 h-1 bg-red-600"></div>
          </div>
          
          <Link href="/products" className="inline-flex items-center mt-4 md:mt-0 text-gray-700 hover:text-red-600 group">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-red-600 mr-2"></span>
              <span className="w-3 h-3 bg-red-600 mr-2"></span>
              <span className="w-3 h-3 bg-red-600 mr-2"></span>
            </span>
            <span className="font-medium">Explore all products</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id}
              image={product.image}
              title={product.title}
              link={product.link}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendedProducts
