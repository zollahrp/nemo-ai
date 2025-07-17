"use client";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-white">
            <div className="max-w-screen-2xl mx-auto px-8 lg:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-sm text-gray-700">
                <div>
                    <h3 className="font-bold text-base mb-4">Navigasi</h3>
                    <ul className="space-y-2">
                        <li><button onClick={() => scrollToSection("home")} className="hover:underline">Home</button></li>
                        <li><button onClick={() => scrollToSection("langkah")} className="hover:underline">Langkah</button></li>
                        <li><button onClick={() => scrollToSection("features")} className="hover:underline">Fitur</button></li>
                        <li><button onClick={() => scrollToSection("tampilan")} className="hover:underline">Tampilan</button></li>
                        <li><button onClick={() => scrollToSection("faq")} className="hover:underline">FAQ</button></li>
                        <li><button onClick={() => scrollToSection("contact")} className="hover:underline">Kontak</button></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-base mb-4">Apa yang Kami Lakukan</h3>
                    <p>
                        Nemo.Ai berfokus untuk menyediakan solusi inovatif dalam merawat dan
                        memelihara ikan hias. Kami menggabungkan teknologi terkini dengan antarmuka
                        yang ramah pengguna, memberikan pengalaman yang mudah dan menyenangkan bagi
                        para pecinta ikan hias.
                    </p>
                </div>

                <div className="text-right">
                    <h3 className="font-bold text-base mb-4">Hubungi Kami</h3>
                    <ul className="space-y-2">
                        <li>nemoai@gmail.com</li>
                        <li>+62 12345678</li>
                        <li><a href="https://www.instagram.com/zollahrp">Facebook</a></li>
                        <li><a href="https://www.linkedin.com/in/zolla/">LinkedIn</a></li>
                        <li><a href="https://www.instagram.com/zollahrp">Twitter</a></li>
                        <li><a href="https://www.instagram.com/zollahrp">Instagram</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t py-6 px-8 lg:px-20 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 max-w-screen-2xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src="/img/logo.png" alt="Nemo.Ai Logo" className="h-16 w-auto" />
                </div>

                <div className="mt-4 sm:mt-0">
                    © 2025 Nemo.Ai. All Rights Reserved.
                </div>

                <div className="flex gap-4 mt-4 sm:mt-0 text-gray-600">
                    <a href="https://www.instagram.com/zollahrp"><FaFacebookF /></a>
                    <a href="https://www.linkedin.com/in/zolla/"><FaLinkedinIn /></a>
                    <a href="https://www.instagram.com/zollahrp"><FaTwitter /></a>
                    <a href="https://www.instagram.com/zollahrp"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
}
