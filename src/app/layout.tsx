import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// PrimeReact imports
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ToastProvider } from "@/contexts/ToastContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { EasterEggProvider } from "@/contexts/EasterEggContext";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark',
  themeColor: '#030711',
};

export const metadata: Metadata = {
  title: "CPT Group - Class Action Lawsuit Member Management",
  description: "Manage class action lawsuit members efficiently with CPT Group's member management system.",
  icons: {
    icon: "/cpt-gen.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} min-h-screen flex flex-col`}>
        <PrimeReactProvider>
          <ThemeProvider>
            <ToastProvider>
              <EasterEggProvider>
                {children}
                <Footer />
              </EasterEggProvider>
            </ToastProvider>
          </ThemeProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
