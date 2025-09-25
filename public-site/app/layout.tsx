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
      <body className={`${inter.className} font-sans bg-background text-primary`}>
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              CCLR
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-accent">Home</Link>
              <Link href="/blogs" className="hover:text-accent">Blog</Link>
              <Link href="/publications" className="hover:text-accent">Publications</Link>
              <Link href="/events" className="hover:text-accent">Events</Link>
            </div>
          </nav>
        </header>

        <motion.main
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          {children} {/* This renders the content of your page.tsx */}
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