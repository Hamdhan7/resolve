import { Provider } from "@/providers/provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OneHelp",
    template: "%s | OneHelp",
  },
  description:
    "An AI powered complaint management system for better customer support.",
  openGraph: {
    title: "OneHelp",
    description:
      "An AI powered complaint management system for better customer support.",
    url: "https://onehelp.online",
    siteName: "OneHelp",
  },
  keywords: ["complaint management", "customer support", "AI powered"],
  robots: {
    // TODO: Change to true before production
    index: false,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
