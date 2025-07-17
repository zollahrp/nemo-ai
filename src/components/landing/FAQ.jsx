'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import faqs from '../lib/faq'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="scroll-mt-[200px] py-20 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="max-w-screen-2xl mx-auto px-8 lg:px-20 grid grid-cols-1 md:grid-cols-5 gap-10 items-center"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3"
        >
          <h4 className="text-sm font-semibold text-[#0E91E9] uppercase mb-2">FAQ</h4>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
            Pertanyaan <br /> yang Sering Diajukan
          </h2>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-md shadow-sm hover:shadow-md transition"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between px-6 py-4"
                >
                  <span className="text-left text-sm sm:text-base text-gray-700">
                    {faq.question}
                  </span>
                  {openIndex === i ? (
                    <IconChevronUp size={24} className="text-[#0E91E9]" />
                  ) : (
                    <IconChevronDown size={24} className="text-[#0E91E9]" />
                  )}
                </button>

                <motion.div
                  animate={{
                    height: openIndex === i ? 'auto' : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  initial={false}
                  transition={{ duration: 0.3 }}
                  className="px-6 overflow-hidden"
                >
                  <p className="text-sm text-gray-600 py-2">{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 flex flex-col items-center text-center"
        >
          <Image
            src="/img/faq.png"
            alt="FAQ Illustration"
            width={300}
            height={300}
            className="mb-6"
          />
          <h3 className="text-xl font-bold text-[#0E91E9] mb-1">Ada Pertanyaan?</h3>
          <p className="text-gray-600 text-sm max-w-xs">
            Silakan tanyakan apa saja yang ingin kamu ketahui tentang Nemo.Ai
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
