"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 🛠️ Pindahkan fungsi ini ke atas return!
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "backdrop-blur-md bg-white/70 shadow-md"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-8 lg:px-20 py-0">
                <div className="flex items-center">
                    <a href="/">
                        <img src="/img/logo.png" alt="Logo" className="h-20 w-auto cursor-pointer" />
                    </a>
                </div>

                <nav className="hidden md:flex items-center gap-10 text-lg font-semibold text-gray-800">
                    <button onClick={() => scrollToSection("home")} className="hover:text-[#0E91E9]">Home</button>
                    <button onClick={() => scrollToSection("langkah")} className="hover:text-[#0E91E9]">Langkah</button>
                    <button onClick={() => scrollToSection("features")} className="hover:text-[#0E91E9]">Fitur</button>
                    <button onClick={() => scrollToSection("tampilan")} className="hover:text-[#0E91E9]">Tampilan</button>
                    <button onClick={() => scrollToSection("faq")} className="hover:text-[#0E91E9]">FAQ</button>
                    <button onClick={() => scrollToSection("contact")} className="hover:text-[#0E91E9]">Kontak</button>
                </nav>
            </div>
        </header>
    );
}
