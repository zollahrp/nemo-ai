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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/70 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-8 lg:px-20 py-0">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/img/logo.png" alt="Logo" className="h-20 w-auto" />
        </div>

        {/* Nav Menu */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-semibold text-gray-800">
          <a href="#home" className="hover:text-[#0E91E9]">Home</a>
          <a href="#langkah" className="hover:text-[#0E91E9]">Langkah</a>
          <a href="#features" className="hover:text-[#0E91E9]">Fitur</a>
          <a href="#tampilan" className="hover:text-[#0E91E9]">Tampilan</a>
          <a href="#faq" className="hover:text-[#0E91E9]">FAQ</a>
          <a href="#contact" className="hover:text-[#0E91E9]">Kontak</a>
        </nav>
      </div>
    </header>
  );
}
