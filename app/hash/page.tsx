import type { Metadata } from "next"
import HashClient from "./hash-client"

export const metadata: Metadata = {
  title: "Hash Generator — MD5, SHA-1, SHA-256, SHA-512",
  description: "Generate cryptographic hashes using MD5, SHA-1, SHA-256, and SHA-512 via the Web Crypto API. Nothing leaves your browser.",
  keywords: ["hash generator", "MD5 hash", "SHA-256 generator", "SHA-512", "SHA-1", "cryptographic hash", "checksum generator"],
  openGraph: {
    title: "Hash Generator — MD5, SHA-1, SHA-256, SHA-512 | devkit",
    description: "Generate cryptographic hashes using MD5, SHA-1, SHA-256, and SHA-512 via the Web Crypto API. Nothing leaves your browser.",
    url: "https://devkit.yaro-labs.com/hash",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hash Generator — MD5, SHA-1, SHA-256, SHA-512 | devkit",
    description: "Generate cryptographic hashes using MD5, SHA-1, SHA-256, and SHA-512 via the Web Crypto API. Nothing leaves your browser.",
    images: ["/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hash Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://devkit.yaro-labs.com/hash",
  description: "Generate cryptographic hashes using MD5, SHA-1, SHA-256, and SHA-512 via the Web Crypto API. Nothing leaves your browser.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Yaro Labs", url: "https://yaro-labs.com" },
}

export default function HashPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HashClient />
    </>
  )
}
