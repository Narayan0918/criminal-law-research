// public-site/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Centre for Criminal Law Research",
  description: "Exploring the frontiers of criminal jurisprudence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              CCLR
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-blue-700">Home</Link>
              <Link href="/blogs" className="hover:text-blue-700">Blog</Link>
              <Link href="/publications" className="hover:text-blue-700">Publications</Link>
              <Link href="/events" className="hover:text-blue-700">Events</Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-white mt-12 py-6 text-center text-gray-600 border-t">
          <p>&copy; {new Date().getFullYear()} Centre for Criminal Law Research. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}