import type { Metadata, Viewport } from "next";
import "./globals.css";
import { schoolConfig } from "@/config/schoolInfo";
import { AuthProvider } from "@/context/AuthContext";
import { PortalDataProvider } from "@/context/PortalDataContext";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";

export const viewport: Viewport = {
  themeColor: "#0f2d59",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${schoolConfig.name} | Digital Ecosystem`,
    template: `%s | ${schoolConfig.name}`,
  },
  description: schoolConfig.description,
  keywords: [
    "Mary Matha School Ripponpet",
    "Mary Matha High School",
    "Mary Matha Primary School",
    "UDISE 29150224207",
    "Shimoga Karnataka State Board",
    "English medium school Ripponpet",
    "Co-ed Day and Boarding school Shimoga",
    "Sister Gracelin Mary Matha",
    "school admissions Ripponpet",
  ],
  authors: [{ name: schoolConfig.name }],
  creator: schoolConfig.name,
  publisher: schoolConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://marymathaschool.edu.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${schoolConfig.name} — Nurturing Character, Fostering Curiosity`,
    description: schoolConfig.description,
    url: "https://marymathaschool.edu.in",
    siteName: schoolConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: schoolConfig.name,
    description: schoolConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-school-100 selection:text-school-900">
        <AuthProvider>
          <PortalDataProvider>
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
          </PortalDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

