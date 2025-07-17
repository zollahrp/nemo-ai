"use client";

import Image from "next/image";
import appstore from "/public/img/app-store.png";
import googleplay from "/public/img/google-play.png";
import homemockup from "/public/img/home-mockup.png";

export default function Home() {
    return (
        <section className="min-h-screen bg-[#FAFAFA] flex items-center font-['Poppins']">
            <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                <div className="text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 leading-tight aos-init aos-animate">
                        Solusi Cerdas Bagi para<br />
                        pecinta <span className="text-blue-600">Ikan Hias</span>
                    </h1> <br></br>
                    <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-8">
                        Nikmati kemudahan mendeteksi penyakit, mengatur ekosistem akuarium,
                        dan mendapatkan tips perawatan terbaik.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a
                            href="https://github.com/zollahrp/nemo-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image src={appstore} alt="App Store" className="h-12 w-auto" />
                        </a>
                        <a
                            href="https://github.com/zollahrp/nemo-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image src={googleplay} alt="Google Play" className="h-12 w-auto" />
                        </a>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end">
                    <Image src={homemockup} alt="Home Mockup" className="w-full" priority />
                </div>
            </div>
        </section>
    );
}
