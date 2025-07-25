'use client'

import Image from 'next/image'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

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

    if (index === current) return 'z-30 scale-100 opacity-100 md:block'

    if (index === prev1)
      return 'hidden md:block z-20 scale-95 opacity-60 -translate-x-40 -rotate-2 blur-sm'

    if (index === next1)
      return 'hidden md:block z-20 scale-95 opacity-60 translate-x-40 rotate-2 blur-sm'

    if (index === prev2)
      return 'hidden md:block z-10 scale-85 opacity-40 -translate-x-80 -rotate-3 blur-sm'

    if (index === next2)
      return 'hidden md:block z-10 scale-85 opacity-40 translate-x-80 rotate-3 blur-sm'

    return 'hidden'
  }

  return (
    <section id="tampilan" className="scroll-mt-[30px] bg-[#FAFAFA]">
      <div className="max-w-screen-xl mx-auto py-20 px-8 lg:px-20 text-center">

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold text-[#0E91E9] uppercase mb-2"
        >
          Showcase
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Lihat Tampilan <br /> Antarmuka Nemo.Ai
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Gak perlu ribet lagi! Semua fitur keren Nemo.Ai dikemas dalam tampilan yang simpel dan interaktif. Yuk lihat sendiri, seberapa mudahnya menjadi aquascaper modern!
        </motion.p>

        <div className="relative flex items-center justify-center h-[590px]">
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

        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-[#0E91E9]' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
