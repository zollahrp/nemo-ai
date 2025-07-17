"use client";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false); // close menu after click
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen
                    ? "backdrop-blur-md bg-white/70 shadow-md"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 lg:px-20 py-4">
                <div className="flex items-center">
                    <a href="/">
                        <img src="/img/logo.png" alt="Logo" className="h-16 w-auto cursor-pointer" />
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

                <button
                    className="md:hidden text-3xl text-gray-800"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <HiX /> : <HiOutlineMenu />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-md rounded-b-xl py-4 px-6 text-gray-800 font-semibold">
                    <ul className="space-y-4">
                        <li><button onClick={() => scrollToSection("home")} className="w-full text-left hover:text-[#0E91E9]">Home</button></li>
                        <li><button onClick={() => scrollToSection("langkah")} className="w-full text-left hover:text-[#0E91E9]">Langkah</button></li>
                        <li><button onClick={() => scrollToSection("features")} className="w-full text-left hover:text-[#0E91E9]">Fitur</button></li>
                        <li><button onClick={() => scrollToSection("tampilan")} className="w-full text-left hover:text-[#0E91E9]">Tampilan</button></li>
                        <li><button onClick={() => scrollToSection("faq")} className="w-full text-left hover:text-[#0E91E9]">FAQ</button></li>
                        <li><button onClick={() => scrollToSection("contact")} className="w-full text-left hover:text-[#0E91E9]">Kontak</button></li>
                    </ul>
                </div>
            )}
        </header>
    );
}
