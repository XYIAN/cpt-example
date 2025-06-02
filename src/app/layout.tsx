import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark',
  themeColor: '#030711',
};

export const metadata: Metadata = {
  title: {
    template: '%s | CPT Group Member Management',
    default: 'CPT Group Member Management'
  },
  description: 'Efficient member management system for class action lawsuits. Track, manage, and analyze member data with ease.',
  keywords: ['class action', 'lawsuit', 'member management', 'legal', 'CPT Group'],
  authors: [{ name: 'CPT Group' }],
  creator: 'CPT Group',
  publisher: 'CPT Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'CPT Group Member Management',
    description: 'Efficient member management system for class action lawsuits',
    url: 'https://cptgroup.com',
    siteName: 'CPT Group Member Management',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className}`}>
        <PrimeReactProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
