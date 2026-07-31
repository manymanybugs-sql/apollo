import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apolloinsight.io"),

  verification: {
    google: "O5bDbN3hMMA5g3zeouLD_8u95Til9-YnhEbIQGsT440",
  },

  title: {
    default: "Apollo",
    template: "%s | Apollo",
  },

  description:
    "Conversations with extraordinary founders, investors, operators and builders shaping what comes next.",

  keywords: [
    "Apollo",
    "founder interviews",
    "startup podcast",
    "venture capital",
    "technology",
    "founders",
    "operators",
    "builders",
    "investors",
  ],

  openGraph: {
    title: "Apollo",
    description:
      "Conversations with extraordinary founders, investors, operators and builders shaping what comes next.",
    url: "https://apolloinsight.io",
    siteName: "Apollo",
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Apollo",
    description:
      "Conversations with extraordinary founders, investors, operators and builders shaping what comes next.",
  },

  alternates: {
    canonical: "https://apolloinsight.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}