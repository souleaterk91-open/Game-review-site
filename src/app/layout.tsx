import "./globals.css";
import "@/styles/pages.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GameReview Hub | The Pre & Post Game Experience",
  description:
    "Your ultimate destination for spoiler-free reviews and deep-dive post-game analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav id="main-navbar" className="glass-panel navbar">
          <div className="container navbar-inner">
            <h2 className="navbar-brand">
              Game<span className="text-gradient">Review</span> Hub
            </h2>
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
        <main>{children}</main>
      </body>
    </html>
  );
}
