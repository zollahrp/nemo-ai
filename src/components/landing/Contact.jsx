"use client";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function Contact() {
    const [formData, setFormData] = useState({
        user_name: "",
        email: "",
        title: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                formData,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );

            Swal.fire({
                icon: "success",
                title: "Pesan Terkirim!",
                text: "Terima kasih! Kami akan merespon dalam 3 hari kerja.",
                confirmButtonColor: "#0E91E9"
            });

            setFormData({ user_name: "", email: "", title: "", message: "" });
        } catch (error) {
            console.error("Gagal kirim pesan:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal mengirim",
                text: "Ada masalah saat mengirim pesan. Coba lagi nanti.",
                confirmButtonColor: "#d33"
            });
        }
    };

    return (
        <>
            <section id="contact" className="bg-white scroll-mt-[50px] py-20 px-8 lg:px-20 max-w-screen-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <p className="text-[#0E91E9] font-semibold text-lg mb-2">Contact Us</p>
                    <h2 className="text-3xl font-bold mb-4 text-black">Kontak kami</h2>
                    <p className="text-gray-500 max-w-xl mb-12">
                        Punya pertanyaan, ide, atau ada masalah lain? Kirim pesan ke kami, tim Nemo.Ai siap bantu kamu kapan aja!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6 lg:col-span-2"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        {["Nama", "Email", "Subjek", "Pesan"].map((label, i) => {
                            const name = ["user_name", "email", "title", "message"][i];
                            const isTextarea = name === "message";
                            return (
                                <motion.div key={name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * i }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                                    {isTextarea ? (
                                        <textarea
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            rows="4"
                                            required
                                            className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0E91E9] py-2"
                                        ></textarea>
                                    ) : (
                                        <input
                                            type={name === "email" ? "email" : "text"}
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0E91E9] py-2"
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="bg-[#0E91E9] hover:bg-[#0C7BC5] text-white font-semibold py-2 px-6 rounded-xl shadow-md"
                        >
                            Kirim
                        </motion.button>
                    </motion.form>

                    <motion.div
                        className="bg-[#0E91E9] text-white p-8 rounded-xl shadow-md space-y-6 self-start"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-semibold mb-4">Informasi Kontak</h3>
                        <div className="flex items-center space-x-4">
                            <Mail size={28} />
                            <span>nemoai@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Phone size={28} />
                            <span>+62 812-8932-6329</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <MapPin size={28} />
                            <span>
                                Jl. Kumbang No.14, RT.02/RW.06, Babakan, <br />
                                Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16128
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <motion.section
                className="w-full bg-gradient-to-r from-[#32B1F3] to-[#0279D4] mt-0 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 flex flex-col lg:flex-row items-center justify-center gap-4">
                    <motion.p
                        className="text-white text-lg font-semibold text-center lg:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Download Aplikasi Nemo.Ai untuk iOS & Android
                    </motion.p>
                    <div className="flex gap-4">
                        <motion.a
                            href="https://github.com/zollahrp/nemo-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <img src="/img/google-play.png" alt="Google Play" className="h-12 w-auto" />
                        </motion.a>

                        <motion.a
                            href="https://github.com/zollahrp/nemo-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <img src="/img/app-store.png" alt="App Store" className="h-12 w-auto" />
                        </motion.a>
                    </div>
                </div>
            </motion.section>
        </>
    );
}
