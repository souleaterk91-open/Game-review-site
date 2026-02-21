import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import "@/styles/pages.css";
import "@/styles/components.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Review Vault | The Pre & Post Game Experience",
  description: "Ultimate destination for spoiler-free reviews and deep-dive post-game analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav id="main-navbar" className="glass-panel navbar">
          <div className="container navbar-inner">
            <Link href="/" className="navbar-logo-link">
              <h2 className="navbar-brand">
                Game Review <span className="text-gradient">Vault</span>
              </h2>
            </Link>
            <div className="navbar-actions">
              <button id="btn-login" className="btn-outline">
                Log in
              </button>
              <button id="btn-signup" className="btn-primary">
                Sign up
              </button>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
