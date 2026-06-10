import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ikhtiyaar",
  description: "Ikhtiyaar",
  icons: { icon: "/logo.png" },
};

import Navbar from "@/components/Navbar/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&f[]=satoshi@400,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {/* <SmoothScroll> */}
        <Navbar />
        {children}
        <Footer />
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
