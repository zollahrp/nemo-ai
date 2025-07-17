"use client";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
    return (
        <section
            id="contact"
            className="py-20 px-8 lg:px-20 max-w-screen-2xl mx-auto"
        >
            <p className="text-[#0E91E9] font-semibold text-lg mb-2">Contact Us</p>
            <h2 className="text-3xl font-bold mb-4">Kontak kami</h2>
            <p className="text-gray-500 max-w-xl mb-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* FORM */}
                <form className="space-y-6">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Name
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
                            Message
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
                        Send
                    </button>
                </form>

                {/* INFO */}
                <div className="bg-[#0E91E9] text-white p-8 rounded-xl shadow-md space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Information</h3>
                    <div className="flex items-center space-x-4">
                        <Mail size={28} />
                        <span>Lorem ipsum dolor sit amet</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Phone size={28} />
                        <span>Lorem ipsum dolor sit amet</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <MapPin size={28} />
                        <span>Lorem ipsum dolor sit amet</span>
                    </div>
                </div>
            </div>
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-16">
                <div className="bg-gradient-to-r from-[#32B1F3] to-[#0279D4] py-6 px-4 flex flex-col lg:flex-row items-center justify-center gap-4">
                    <p className="text-white text-lg font-semibold">
                        Download Aplikasi Fishco untuk iOS & Android
                    </p>
                    <div className="flex gap-4">
                        <img
                            src="/img/google-play.png"
                            alt="Google Play"
                            className="h-12 w-auto"
                        />
                        <img
                            src="/img/app-store.png"
                            alt="App Store"
                            className="h-12 w-auto"
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}
