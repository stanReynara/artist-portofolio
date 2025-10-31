import { Navbar } from "@components/Navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portofolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="pastel">
      <body>
        <Navbar />
        <div className="antialiased min-h-screen p-6 sm:p-10 bg-base-100">
          {children}
        </div>
      </body>
    </html>
  );
}
