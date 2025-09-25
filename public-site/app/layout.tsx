// public-site/app/layout.tsx
"use client"; // Add this line to use Framer Motion

import { Inter } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion"; // 1. Import motion

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans bg-gray-50 text-gray-800`}>
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              CCLR
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-blue-700">
                Home
              </Link>
              <Link href="/blogs" className="hover:text-blue-700">
                Blog
              </Link>
              <Link href="/publications" className="hover:text-blue-700">
                Publications
              </Link>
              <Link href="/events" className="hover:text-blue-700">
                Events
              </Link>
            </div>
          </nav>
        </header>

        <motion.main
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          {children}
        </motion.main>

        <footer className="bg-white mt-12 py-6 text-center text-gray-600 border-t">
          <p>
            &copy; {new Date().getFullYear()} Centre for Criminal Law Research.
            All Rights Reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
