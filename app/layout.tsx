import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Link from "next/link";
import { ToastProvider } from "@/app/context/toastContext";
import { ToastContainer } from "@/components/ui/toastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contract dev tools",
  description: "Contract dev tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme>
          <ToastProvider>
            <header className="sticky top-0 z-50 w-full border-b bg-foreground/90">
              <div className="container flex h-14 items-center p-4">
                <div className="flex flex-row items-center space-x-4 text-white font-bold">
                  <Link href="/">Contract Dev Tools</Link>
                  <Link href="/accounts">Accounts</Link>
                  <Link href="/blocks">Blocks</Link>
                  <Link href="/contracts">Contracts</Link>
                </div>
              </div>
            </header>
            <div className="flex flex-col min-h-screen bg-background/20">
              <div className="flex flex-col mt-10 mb-10 mr-20 ml-20">
                {children}
              </div>
            </div>
            <ToastContainer />
          </ToastProvider>
        </Theme>
      </body>
    </html>
  );
}
