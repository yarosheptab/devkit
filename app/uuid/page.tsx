import type { Metadata } from "next"
import UuidClient from "./uuid-client"

export const metadata: Metadata = {
  title: "UUID Generator",
  description: "Generate v4 UUIDs in bulk, instantly. Copy one or many, no account needed.",
  keywords: ["UUID generator", "generate UUID", "random UUID", "v4 UUID", "GUID generator"],
  openGraph: {
    title: "UUID Generator | devkit",
    description: "Generate v4 UUIDs in bulk, instantly. Copy one or many, no account needed.",
    url: "https://devkit.yaro-labs.com/uuid",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator | devkit",
    description: "Generate v4 UUIDs in bulk, instantly. Copy one or many, no account needed.",
    images: ["/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "UUID Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://devkit.yaro-labs.com/uuid",
  description: "Generate v4 UUIDs in bulk, instantly. Copy one or many, no account needed.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Yaro Labs", url: "https://yaro-labs.com" },
}

export default function UuidPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UuidClient />
    </>
  )
}
