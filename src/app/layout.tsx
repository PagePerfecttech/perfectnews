import type { Metadata } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BreakingNews } from "@/components/layout/BreakingNews";
import { LiveTVPlayer } from "@/components/layout/LiveTVPlayer";
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
  title: "Telugu Post | మీ స్వరం, మీ అండ",
  description: "Andhra Pradesh & Telangana's Leading News Portal",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  keywords: "Telugu News, Latest News, Breaking News, Andhra Pradesh News, Telangana News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te">
      <body className={`${inter.variable} ${notoTelugu.variable} antialiased font-sans`}>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        
        {/* OneSignal Web Push */}
        {process.env.ONESIGNAL_APP_ID && (
          <script
            src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
            async
          />
        )}

        <div className="flex flex-col min-h-screen">
          <Header />
          <BreakingNews />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>

        <LiveTVPlayer />
      </body>
    </html>
  );
}
