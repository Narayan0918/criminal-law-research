"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} font-sans bg-background text-primary`}
      >
        <header className="bg-navBackground shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              <span className="text-xl font-bold text-primary">C</span>
              <span className="text-xl font-bold text-logocolor1">C</span>
              <span className="text-xl font-bold text-primary">L</span>
              <span className="text-xl font-bold text-logocolor2">R</span>
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-logocolor2 font-bold">
                Home
              </Link>
              <Link href="/blogs" className="hover:text-logocolor2 font-bold">
                Blog
              </Link>
              <Link
                href="/publications"
                className="hover:text-logocolor2 font-bold"
              >
                Publications
              </Link>
              <Link href="/events" className="hover:text-logocolor2 font-bold">
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

        <footer className="bg-footBackground mt-12 py-6 text-center text-gray-600 border-t">
          <p>
            &copy; {new Date().getFullYear()} Centre for Criminal Law Research.
            All Rights Reserved.
          </p>
          {/* --- START: Added Admin Login Link --- */}
          <div className="mt-2">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-800 hover:text-accent"
            >
              Admin Login
            </a>
          </div>
          {/* --- END: Added Admin Login Link --- */}
        </footer>
      </body>
    </html>
  );
}
