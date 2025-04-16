import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Stay organized and boost your productivity with our simple and intuitive To-Do App. Easily create, manage, and track your tasks, whether you're planning your day or organizing long-term goals. Your time, your way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className}`}
      >
        {children}
      </body>
    </html>
  );
}
