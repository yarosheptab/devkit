import type { Metadata } from "next"
import UrlClient from "./url-client"

export const metadata: Metadata = {
  title: "URL Encoder / Decoder",
  description: "Encode and decode URL components online. Handles percent-encoding for query strings and path segments.",
  keywords: ["URL encoder", "URL decoder", "percent encoding", "URL encode online", "encode URL components"],
  openGraph: {
    title: "URL Encoder / Decoder | devkit",
    description: "Encode and decode URL components online. Handles percent-encoding for query strings and path segments.",
    url: "https://devkit.yaro-labs.com/url",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encoder / Decoder | devkit",
    description: "Encode and decode URL components online. Handles percent-encoding for query strings and path segments.",
    images: ["/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "URL Encoder / Decoder",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://devkit.yaro-labs.com/url",
  description: "Encode and decode URL components online. Handles percent-encoding for query strings and path segments.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Yaro Labs", url: "https://yaro-labs.com" },
}

export default function UrlPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UrlClient />
    </>
  )
}
