import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials"; // Import your new component
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tamarron Services",
  description: "Expert outdoor living solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <Navbar />
        
        {/* The social icons float independently of the main content flow */}
        <FloatingSocials /> 

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        {/* Paste your G- code directly here */}
        <GoogleAnalytics gaId="G-WFL4RLHT9Q" />
      </body>
    </html>
  );
}