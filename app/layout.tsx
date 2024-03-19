import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ageron Joachim",
  description: "Ageron Joachim's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const inProduction = process.env.NODE_ENV === "production";
  
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    {inProduction && <SpeedInsights/>}
    {inProduction && <Analytics/>}
    </html>
  );
}
