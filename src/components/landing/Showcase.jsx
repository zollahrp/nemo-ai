'use client'

import Image from 'next/image'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'

const images = [
  '/img/nemo1.jpg',
  '/img/nemo2.jpg',
  '/img/nemo3.png',
  '/img/nemo4.png',
  '/img/nemo5.png',
]

export default function Showcase() {
  const [current, setCurrent] = useState(0)

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const getPositionClass = (index) => {
    const prev2 = (current - 2 + images.length) % images.length
    const prev1 = (current - 1 + images.length) % images.length
    const next1 = (current + 1) % images.length
    const next2 = (current + 2) % images.length

    if (index === current) return 'z-30 scale-100 opacity-100'

    if (index === prev1)
      return 'z-20 scale-95 opacity-60 -translate-x-40 -rotate-2 blur-sm'

    if (index === next1)
      return 'z-20 scale-95 opacity-60 translate-x-40 rotate-2 blur-sm'

    if (index === prev2)
      return 'z-10 scale-85 opacity-40 -translate-x-80 -rotate-3 blur-sm hidden md:block'

    if (index === next2)
      return 'z-10 scale-85 opacity-40 translate-x-80 rotate-3 blur-sm hidden md:block'

    return 'hidden'
  }

  return (
    <section id="showcase" className="bg-[#FAFAFA]">
      <div className="max-w-screen-xl mx-auto py-20 px-8 lg:px-20 text-center">
        <h2 className="text-sm font-semibold text-[#0E91E9] uppercase mb-2">Showcase</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Lihat Tampilan <br /> Antarmuka Nemo.AI
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ,
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        </p>

        {/* Carousel */}
        <div className="relative flex items-center justify-center h-[550px]">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-in-out transform ${getPositionClass(index)}`}
            >
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={270}
                height={470}
                className="rounded-xl shadow-xl cursor-pointer"
              />
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <IconChevronLeft size={24} className="text-[#0E91E9]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <IconChevronRight size={24} className="text-[#0E91E9]" />
          </button>
        </div>

        {/* Bullet */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === current ? 'bg-[#0E91E9]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
