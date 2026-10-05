import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joachim Ageron - Full Stack TypeScript Developer",
  description: "Joachim Ageron, full stack TypeScript developer: I build useful products end to end, from the UI to the infrastructure.",
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
