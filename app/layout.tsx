import type { Metadata, Viewport } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { RecaptchaProvider } from "@/components/providers/RecaptchaProvider";
import { SITE } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Casa Inteligente em São Paulo`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "automação residencial São Paulo",
    "casa inteligente SP",
    "home theater",
    "CFTV câmeras de segurança",
    "Alexa automação",
    "Control4",
    "Mesh WiFi",
    "automação corporativa",
    "smart home",
    "automação predial",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Casa Inteligente em São Paulo`,
    description: SITE.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Casa Inteligente em São Paulo`,
    description: SITE.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: SITE.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#22C55E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full antialiased">
        <SmoothScrollProvider>
          <RecaptchaProvider>
            {children}
            <Toaster
              position="bottom-right"
              theme="dark"
              toastOptions={{
                style: {
                  background: "#282A36",
                  border: "1px solid rgba(34,197,94,0.3)",
                  color: "#E8E8ED",
                },
              }}
            />
          </RecaptchaProvider>
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
