'use client'

import {
  IconDownload,
  IconUserCircle,
  IconRobot,
} from '@tabler/icons-react'

const steps = [
  {
    icon: <IconDownload size={32} className="text-[#0E91E9]" />,
    title: 'Install Aplikasi',
    desc: 'Unduh dan pasang aplikasi Nemo.Ai dari platform pilihanmu untuk memulai petualanganmu dalam merawat ikan hias.',
  },
  {
    icon: <IconUserCircle size={32} className="text-[#0E91E9]" />,
    title: 'Siapkan Profil Kamu',
    desc: 'Buat profil dengan cepat dan mudah untuk menyesuaikan pengalamanmu di Nemo.Ai, termasuk mengelola ikan hias dan konsultasi.',
  },
  {
    icon: <IconRobot size={32} className="text-[#0E91E9]" />,
    title: 'Nikmati Fiturnya',
    desc: 'Akses berbagai fitur, mulai dari scanner hingga Fishbot dan temukan solusi cepat untuk kesehatan ikan serta panduan merawat ekosistem akuarium.',
  },
];

export default function Steps() {
  return (
    <section
      id="langkah"
      className="py-20 px-8 lg:px-20 max-w-screen-2xl mx-auto bg-[#FFFFFF]"
    >
      <div className="mb-12">
        <p className="text-sm font-semibold text-[#0E91E9] mb-1">Steps</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Langkah Mudah
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="border rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-[4rem] p-6 shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="bg-[#E0F2FE] w-12 h-12 flex items-center justify-center rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
