import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Ini wajib ada biar Tailwind jalan

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freezyle Store MVP",
  description: "Top Up Game Murah & Cepat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}