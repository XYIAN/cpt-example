import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// PrimeReact imports
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/mdc-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ToastProvider } from "@/contexts/ToastContext";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Class Action Lawsuit Member Management",
  description: "Member management system for class action lawsuits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={geist.className}>
        <PrimeReactProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
