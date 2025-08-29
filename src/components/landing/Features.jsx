'use client'

import Image from "next/image"
import { IconCheck } from "@tabler/icons-react"
import { motion } from "framer-motion"

const features = [
  {
    title: "Scanner Ikan Hias",
    desc: "Kamu dapat scan ikan hias menggunakan kamera ponselmu dan mendapatkan informasi lengkap tentangnya termasuk apakah ada penyakit atau tidak.",
  },
  {
    title: "Fishbot",
    desc: "Konsultasikan masalah ikan hiasmu dengan Fishbot dan dapatkan solusi cepat.",
  },
  {
    title: "Pengingat Perawatan",
    desc: "Dapatkan pengingat untuk merawat ikan hias dan menjaga kebersihan akuarium kamu.",
  },
  {
    title: "Ensiklopedia",
    desc: "Dapatkan pengingat untuk merawat ikan hias dan menjaga kebersihan akuarium kamu.",
  },
]

export default function Features() {
  return (
    <section id="features" className=" bg-white scroll-mt-[90px] py-20 px-8 lg:px-20 max-w-screen-2xl mx-auto">
      <motion.p
        className="text-[#0E91E9] font-semibold text-lg mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Features
      </motion.p>

      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-black mb-12 leading-snug"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Fitur Keren yang <br /> Membuat Nemo.Ai Berbeda!
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/img/fitur.png"
            alt="Fitur App"
            width={600}
            height={600}
            className="w-full max-w-2xl"
          />
        </motion.div>

        <div className="space-y-6">
          {features.map((fitur, index) => (
            <motion.div
              key={index}
              className="border rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-[4rem] p-6 shadow-sm bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#E0F2FE] w-6 h-6 flex items-center justify-center rounded-full">
                  <IconCheck size={18} className="text-[#0E91E9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-black">{fitur.title}</h3>
                  <p className="text-sm text-gray-700">{fitur.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}