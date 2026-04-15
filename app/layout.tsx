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

export const metadata: Metadata = {
  metadataBase: new URL("https://devkit.yaro-labs.com"),
  title: {
    default: "devkit -- Developer Utilities",
    template: "%s | devkit",
  },
  description:
    "Fast, offline-first developer tools. Format JSON, decode JWTs, test regex, generate UUIDs, encode Base64, hash strings, encode URLs, and diff text -- in the browser.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://devkit.yaro-labs.com",
    siteName: "devkit",
    locale: "en_US",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "devkit -- Developer Utilities" }],
  },
  twitter: {
    card: "summary_large_image",
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
      </body>
    </html>
  )
}
