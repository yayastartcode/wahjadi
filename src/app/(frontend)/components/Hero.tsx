"use client";

import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'

interface Slide {
  title: string;
  image: {
    url: string;
    alt?: string;
  };
}

interface HeroData {
  title: string;
  slides: Slide[];
}

// Fallback slider images in case CMS data is not available
const fallbackSliderImages = [
  {
    id: 1,
    src: "https://shopcdnpro.grainajz.com/102/upload/slide/f81b308af89c801abea9c1bfb7cdf7aa40efa4c7116142a71828e9f623c87a20.jpg",
    alt: "Industrial Air Products 1"
  },
  {
    id: 2,
    src: "https://shopcdnpro.grainajz.com/102/upload/slide/f81b308af89c801abea9c1bfb7cdf7aa40efa4c7116142a71828e9f623c87a20.jpg",
    alt: "Industrial Air Products 2"
  },
  {
    id: 3,
    src: "https://shopcdnpro.grainajz.com/102/upload/slide/f81b308af89c801abea9c1bfb7cdf7aa40efa4c7116142a71828e9f623c87a20.jpg",
    alt: "Industrial Air Products 3"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use CMS data if available, otherwise use fallback
  const sliderImages = heroData?.slides
    ? heroData.slides.map((slide, index) => ({
        id: index + 1,
        src: slide.image.url,
        alt: slide.image.alt || slide.title,
        title: slide.title
      }))
    : fallbackSliderImages;
    
  const slideCount = sliderImages.length;
  
  // Fetch hero data from the CMS
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero');
        if (!response.ok) {
          throw new Error('Failed to fetch hero data');
        }
        const data = await response.json();
        setHeroData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError('Failed to load hero data');
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);
  
  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);
  
  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);
  
  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Reset auto-rotation timer when manually changing slides
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 100);
    }
  };
  
  // Auto-rotation effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, nextSlide]);
  
  return (
    <div className="relative w-full h-[300px] lg:h-[900px] max-w-[1920px] mx-auto overflow-hidden">
      {/* Slider Container */}
      <div className="relative h-full w-full">
        {/* Slides */}
        {sliderImages.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
              priority={index === 0}
              quality={90}
              
            />
          </div>
        ))}
        

      </div>
      
      {/* Slider Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {sliderImages.map((_, index) => (
          <button 
            key={index} 
            onClick={() => goToSlide(index)}
            className={`h-1 transition-all duration-300 ${index === currentSlide ? 'w-8 bg-red-600' : 'w-5 bg-gray-300 hover:bg-red-600'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
