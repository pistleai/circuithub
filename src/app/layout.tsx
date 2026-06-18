import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { ConstructionBanner } from "../components/ConstructionBanner";
import { TopBar } from "../components/TopBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CircuitHub - Electronics & Robotics Distribution Platform",
  description: "CircuitHub is a premium distributor of electronic parts, sensor kits, and prototyping tools. Sourcing platform engineered to resolve supply friction in the Indian market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-gray-900 font-sans">
        <CartProvider>
          <main className="flex-grow flex flex-col">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

