import Home from "@/components/landing/Home";
import Steps from "@/components/landing/Steps";
import Fitur from "@/components/landing/Fitur";
import Showcase from "@/components/landing/showcase";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function LandingPage() {
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
