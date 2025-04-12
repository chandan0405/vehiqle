import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "sonner";


const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Vehiqle",
  description: "Find Your Dream Car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className}`}
        >
          <Header />
          <main className="min-h-screen" >
            {children}
          </main>
          <Toaster richColors />
          <footer className="bg-blue-50 py-12 flex justify-center">
            <div className="container mx-auto text-center px-4 text-gray-600">
              <p>
                Made with Love by Chandan Kumar
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
