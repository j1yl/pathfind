import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Path Finding Visualizer",
  description:
    "A mobile-responsive visualizer for path finding algorithms made with Next.js, React, Tailwind CSS, DaisyUI, and TypeScript. Built by @j1yl and @davidjsolano on GitHub.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div className="mx-auto font-medium max-w-screen-xl min-h-screen items-center justify-center flex flex-col relative p-2">
          {children}
        </div>
      </body>
    </html>
  );
}
