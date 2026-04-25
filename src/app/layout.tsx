import type { Metadata } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-telugu",
});

export const metadata: Metadata = {
  title: "Perfect News",
  description: "Enterprise Telugu News Platform",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  keywords: "Telugu News, Perfect News, తెలుగు వార్తలు",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te">
      <body className={`${inter.variable} ${notoTelugu.variable} antialiased font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
