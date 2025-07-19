import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TokenVerifier from "@/components/TokenVerifier"; // <- komponen client

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nemo.Ai",
  description:
    "Nemo.Ai adalah aplikasi asisten berbasis AI yang membantu kamu mengelola tugas, menjawab pertanyaan, dan mendukung produktivitas harian dengan cepat dan cerdas.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TokenVerifier /> {/* Tambahkan ini */}
        {children}
      </body>
    </html>
  );
}
