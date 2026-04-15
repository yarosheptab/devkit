import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ""

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
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
