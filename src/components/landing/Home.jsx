"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import appstore from "/public/img/app-store.png";
import googleplay from "/public/img/google-play.png";
import homemockup from "/public/img/home-mockup.png";

export default function Home() {
    return (
        <section id="home"className="py-30 min-h-screen bg-[#FAFAFA] flex items-center font-['Poppins']">
            <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                <motion.div
                    className="text-center md:text-left"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 leading-tight">
                        Solusi Cerdas Bagi para<br />
                        pecinta <span className="text-blue-600">Ikan Hias</span>
                    </h1>
                    <br />
                    <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-8">
                        Nikmati kemudahan mendeteksi penyakit, mengatur ekosistem akuarium,
                        dan mendapatkan tips perawatan terbaik.
                    </p>

                    <div className="flex justify-center md:justify-start gap-4">
                        <motion.a
                            href="https://github.com/zollahrp/nemo-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Image src={appstore} alt="App Store" className="h-12 w-auto" />
                        </motion.a>

                        <motion.a
                            href="https://github.com/zollahrp/nemo-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Image src={googleplay} alt="Google Play" className="h-12 w-auto" />
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div
                    className="flex justify-center md:justify-end"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Image src={homemockup} alt="Home Mockup"  className="w-[90%] max-w-3xl mx-auto" priority />
                </motion.div>
            </div>
        </section>
    );
}
