"use client";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
    return (
        <>
            <section
                id="contact"
                className="py-20 px-8 lg:px-20 max-w-screen-2xl mx-auto"
            >
                <p className="text-[#0E91E9] font-semibold text-lg mb-2">Contact Us</p>
                <h2 className="text-3xl font-bold mb-4">Kontak kami</h2>
                <p className="text-gray-500 max-w-xl mb-12">
                    Punya pertanyaan, ide, atau ada masalah lain? Kirim pesan ke kami, tim Nemo.Ai siap bantu kamu kapan aja!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <form className="space-y-6 lg:col-span-2">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Nama
                            </label>
                            <input
                                type="text"
                                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0E91E9] py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0E91E9] py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Pesan
                            </label>
                            <textarea
                                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0E91E9] py-2"
                                rows="4"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#0E91E9] hover:bg-[#0C7BC5] text-white font-semibold py-2 px-6 rounded-xl shadow-md"
                        >
                            Kirim
                        </button>
                    </form>

                    <div className="bg-[#0E91E9] text-white p-8 rounded-xl shadow-md space-y-6 self-start">
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
                    </div>

                </div>
            </section>

            <section className="w-full bg-gradient-to-r from-[#32B1F3] to-[#0279D4] mt-0 overflow-hidden">
                <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 flex flex-col lg:flex-row items-center justify-center gap-4">
                    <p className="text-white text-lg font-semibold text-center lg:text-left">
                        Download Aplikasi Nemo.Ai untuk iOS & Android
                    </p>
                    <div className="flex gap-4">
                        <img src="/img/google-play.png" alt="Google Play" className="h-12 w-auto" />
                        <img src="/img/app-store.png" alt="App Store" className="h-12 w-auto" />
                    </div>
                </div>
            </section>
        </>
    );
}

