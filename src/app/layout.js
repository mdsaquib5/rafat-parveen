import React from "react";
import { barlow, outfit, sacramento } from "../fonts/font";
import "./layout.css";
import "./globals.css";
import "./responsive.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export const metadata = {
  title: "Rafat Parveen | Cabin Crew",
  description: "Rafat Parveen | Cabin Crew",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${outfit.variable} ${barlow.variable} ${sacramento.variable} ${outfit.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}