'use client';

import { useEffect, useState } from 'react';

import Home from "@/components/landing/Home";
import Steps from "@/components/landing/Steps";
import Fitur from "@/components/landing/Features";
import Showcase from "@/components/landing/Showcase";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Loader from "@/components/ui/Loader";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000); // Delay 2 detik
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <main>
        <Home />
        <Steps />
        <Fitur />
        <Showcase />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
