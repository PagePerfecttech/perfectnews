import type { Metadata } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
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
  title: "Perfect News | Setup Wizard",
  description: "Enterprise News SaaS Engine Initialization",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  keywords: "News Portal, SaaS, Perfect News, Administration",
};

import { getSiteSettings } from "@/lib/settings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const primaryColor = (settings as any)?.primaryColor || "#E30613";

  return (
    <html lang="te">
      <body 
        className={`${inter.variable} ${notoTelugu.variable} antialiased font-sans`}
        style={{ '--primary': primaryColor } as React.CSSProperties}
      >
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

        {children}
      </body>
    </html>
  );
}
