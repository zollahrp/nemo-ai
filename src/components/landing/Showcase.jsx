'use client'

import Image from 'next/image'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

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
    <section id="tampilan" className="scroll-mt-[30px] bg-[#FAFAFA]">
      <div className="max-w-screen-xl mx-auto py-20 px-8 lg:px-20 text-center">

        <motion.h2
          className="text-sm font-semibold text-[#0E91E9] uppercase mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Showcase
        </motion.h2>

        <motion.h3
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true }}
        >
          Lihat Tampilan <br /> Antarmuka Nemo.Ai
        </motion.h3>

        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          Gak perlu ribet lagi! Semua fitur keren Nemo.Ai dikemas dalam tampilan yang simpel dan interaktif. Yuk lihat sendiri, seberapa mudahnya menjadi aquascaper modern!
        </motion.p>

        <div className="relative flex items-center justify-center h-[590px]">
          <AnimatePresence mode="wait">
            {images.map((src, index) => {
              const positionClass = getPositionClass(index);
              if (positionClass === 'hidden') return null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className={`absolute transform ${positionClass}`}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 30 }}
                    whileInView={{ scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                  >
                    <Image
                      src={src}
                      alt={`Slide ${index + 1}`}
                      width={270}
                      height={470}
                      loading="lazy"
                      priority={false}
                      className="rounded-xl shadow-xl cursor-pointer"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <motion.button
            onClick={prevSlide}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <IconChevronLeft size={24} className="text-[#0E91E9]" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <IconChevronRight size={24} className="text-[#0E91E9]" />
          </motion.button>
        </div>

        <motion.div
          className="flex justify-center gap-2 mt-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
          viewport={{ once: true }}
        >
          {images.map((_, idx) => (
            <motion.span
              key={idx}
              layout
              className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-[#0E91E9]' : 'bg-gray-300'
                }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
