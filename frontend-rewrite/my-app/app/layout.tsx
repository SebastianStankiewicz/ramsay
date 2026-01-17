import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { balgin } from "@/fonts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ramsay - Money that works harder",
  description: "DeFi savings powered by Hyperliquid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${balgin.variable} font-sans antialiased bg-[#F5F7FA]`}>
        {children}
      </body>
    </html>
  );
}
