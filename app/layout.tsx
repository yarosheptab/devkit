import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { CookieConsent } from "@/components/cookie-consent"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const SITE_URL = "https://devkit.yaro-labs.com"
const SITE_NAME = "devkit"
const SITE_DESCRIPTION =
  "Developer utilities — JSON Formatter, JWT Decoder, Regex Tester, UUID Generator, Base64 Codec, Hash Generator, URL Encoder, Text Diff. Fast, offline-first browser tools by Yaro Labs."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "devkit -- Developer Utilities",
    template: "%s | devkit",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "developer tools",
    "JSON formatter",
    "JWT decoder",
    "regex tester",
    "UUID generator",
    "Base64 encoder",
    "hash generator",
    "URL encoder",
    "text diff",
    "browser tools",
    "offline developer utilities",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "devkit -- Developer Utilities",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "devkit -- Developer Utilities" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "devkit -- Developer Utilities",
    description: SITE_DESCRIPTION,
    images: ["/og/home.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WH34M6C9');`,
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WH34M6C9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <CookieConsent />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE_NAME,
                url: SITE_URL,
                description: SITE_DESCRIPTION,
                publisher: {
                  "@type": "Organization",
                  name: "Yaro Labs",
                  url: "https://yaro-labs.com",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "devkit -- Developer Utilities",
                url: SITE_URL,
                description: SITE_DESCRIPTION,
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Web",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                author: {
                  "@type": "Organization",
                  name: "Yaro Labs",
                  url: "https://yaro-labs.com",
                },
              },
            ]),
          }}
        />
      </body>
    </html>
  )
}
