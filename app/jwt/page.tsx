import type { Metadata } from "next"
import JwtClient from "./jwt-client"

export const metadata: Metadata = {
  title: "JWT Decoder",
  description: "Decode and inspect JSON Web Tokens — header, payload, and signature — instantly in your browser. No data sent to any server.",
  keywords: ["JWT decoder", "JSON web token", "decode JWT", "JWT inspector", "JWT parser"],
  openGraph: {
    title: "JWT Decoder | devkit",
    description: "Decode and inspect JSON Web Tokens — header, payload, and signature — instantly in your browser. No data sent to any server.",
    url: "https://devkit.yaro-labs.com/jwt",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Decoder | devkit",
    description: "Decode and inspect JSON Web Tokens — header, payload, and signature — instantly in your browser. No data sent to any server.",
    images: ["/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JWT Decoder",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://devkit.yaro-labs.com/jwt",
  description: "Decode and inspect JSON Web Tokens — header, payload, and signature — instantly in your browser. No data sent to any server.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Yaro Labs", url: "https://yaro-labs.com" },
}

export default function JwtPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JwtClient />
    </>
  )
}
