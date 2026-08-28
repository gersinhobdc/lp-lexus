import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // googletagmanager serve o gtag.js; googleadservices e
              // doubleclick sao carregados por ele para o Google Ads.
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://*.googletagmanager.com https://www.googleadservices.com https://*.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://connect.facebook.net https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob:",
              // O GA4 envia as medicoes para analytics.google.com e
              // www.google.com/g/collect (nao so google-analytics.com); o
              // Google Ads usa google.com/ccm e doubleclick. Sem esses
              // hosts o navegador bloqueia todo o rastreamento.
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://www.googleadservices.com https://*.googleadservices.com https://www.google.com https://*.google.com https://www.google.com.br https://*.google.com.br https://*.doubleclick.net https://api.resend.com",
              "frame-src https://www.google.com https://maps.google.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
