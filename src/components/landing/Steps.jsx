'use client';

import {
  IconDownload,
  IconUserCircle,
  IconRobot,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

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
      className="scroll-mt-[200px] py-20 px-8 lg:px-20 max-w-screen-2xl mx-auto bg-[#FFFFFF]"
    >
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      >
        <p className="text-sm font-semibold text-[#0E91E9] mb-1">Steps</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Langkah Mudah
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-0">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="border rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-[4rem] p-6 shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="bg-[#E0F2FE] w-12 h-12 flex items-center justify-center rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-black">{step.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
