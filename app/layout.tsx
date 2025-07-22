import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ageron Joachim",
  description: "Ageron Joachim's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
