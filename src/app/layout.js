"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/" || pathname === "/login";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isLoginPage ? (
          children
        ) : (
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex flex-col flex-1">
              <Header />

              <main className="flex-1">
                {children}
              </main>

              <Footer />
            </div>
          </div>
        )}
      </body>
    </html>
  );
}