import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sadow999.github.io/ewsdc-website3";

// Metadata URLs are emitted verbatim, so the sub-path prefix must be explicit.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "EWSDC | Egypt Workforce & Skills Development Corporation",
  description:
    "Building Egypt's Workforce for Industry 4.0 and Beyond. EWSDC bridges the gap between education, research, and labor market requirements through internationally aligned, industry-driven training solutions.",
  keywords: [
    "EWSDC",
    "Egypt workforce development",
    "TVET Egypt",
    "Suez Canal training",
    "industrial skills",
    "Egypt Vision 2030",
    "workforce training",
    "technical education",
    "SCZone",
    "skills development Egypt",
  ],
  authors: [{ name: "Egypt Workforce & Skills Development Corporation" }],
  icons: {
    icon: [{ url: `${BASE_PATH}/favicon.svg`, type: "image/svg+xml" }],
  },
  openGraph: {
    title: "EWSDC | Egypt Workforce & Skills Development Corporation",
    description:
      "Building Egypt's Workforce for Industry 4.0 and Beyond. National workforce development and industrial skills company.",
    type: "website",
    url: SITE_URL,
    siteName: "EWSDC",
  },
  twitter: {
    card: "summary_large_image",
    title: "EWSDC | Egypt Workforce & Skills Development Corporation",
    description: "Building Egypt's Workforce for Industry 4.0 and Beyond.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        {/*
          Removed on the first line of JS execution. Anything gated behind the
          scroll-reveal observer stays visible if scripting is unavailable.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
