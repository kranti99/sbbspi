// app/layout.tsx

import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import React from 'react';
import { Philosopher } from 'next/font/google';
import "./globals.css";
import "../lib/fontawesome";
import HeaderComponent from "@/components/layout/header";
import FooterComponent from "@/components/layout/footer";

import { LanguageProvider } from '@/components/elements/LanguageContext';
import LanguageSwitcher from '@/components/elements/LanguageSwitcher';

// const inter = Inter({ subsets: ["latin"] });
const philosopher = Philosopher({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify the weights you need
});

export const metadata: Metadata = {
  title: "Bhimdutta Polytechnic Institute",
  description: "Bhimdutta Polytechnic Institute (BDPI) is Forty Eighth constituent institute of the Council for Technical Education and Vocational Training (CTEVT).",
  icons: {
    icon: '/logo.png' // Make sure to provide the correct path to the icon
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <link
            rel="icon"
            href="https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png"
            type="image/x-icon" />
      <body className={philosopher.className}>
        <LanguageProvider>
       
          <div className="content_container">
            <HeaderComponent />
            <LanguageSwitcher />
            {children}
          </div>
          <FooterComponent />
        </LanguageProvider>
      </body>
    </html>
  );
}