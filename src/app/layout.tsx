import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

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
            <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {session?.user ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name || "User"} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--primary)' }} />
                    ) : (
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontWeight: 'bold' }}>
                        {session.user.name?.[0] || "U"}
                      </div>
                    )}
                    <span style={{ color: '#fff', fontWeight: 500 }}>{session.user.name?.split(' ')[0]}</span>
                  </div>
                  <form action={async () => {
                    "use server";
                    await signOut();
                  }}>
                    <button type="submit" className="btn-outline">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <form action={async () => {
                  "use server";
                  await signIn("google");
                }}>
                  <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Continue with Google
                  </button>
                </form>
              )}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
