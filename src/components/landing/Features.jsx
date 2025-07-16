'use client'

import Image from "next/image"
import { IconCheck } from "@tabler/icons-react"

const features = [
  {
    title: "Lorem ipsum dolor sit",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
  },
  {
    title: "Lorem ipsum dolor sit",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
  },
  {
    title: "Lorem ipsum dolor sit",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-8 lg:px-20 max-w-screen-2xl mx-auto">
      <p className="text-[#0E91E9] font-semibold text-lg mb-2">Features</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12 leading-snug">
        Fitur Keren yang <br /> Membuat Nemo.Ai Berbeda!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Gambar Kiri */}
        <div className="flex justify-center">
          <Image
            src="/img/fitur.jpg"
            alt="Fitur App"
            width={400}
            height={400}
            className="w-full max-w-md"
          />
        </div>

        {/* List Fitur */}
        <div className="space-y-6">
          {features.map((fitur, index) => (
            <div
              key={index}
              className="border rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-[4rem] p-6 shadow-sm bg-white"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#E0F2FE] w-8 h-8 flex items-center justify-center rounded-full mt-1">
                  <IconCheck size={20} className="text-[#0E91E9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{fitur.title}</h3>
                  <p className="text-sm text-gray-700">{fitur.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
