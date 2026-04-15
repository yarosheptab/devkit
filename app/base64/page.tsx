import type { Metadata } from "next"
import Base64Client from "./base64-client"

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder",
  description: "Encode text or data to Base64 and decode Base64 strings back. Fully client-side.",
  keywords: ["Base64 encoder", "Base64 decoder", "Base64 converter", "encode Base64", "decode Base64"],
  openGraph: {
    title: "Base64 Encoder / Decoder | devkit",
    description: "Encode text or data to Base64 and decode Base64 strings back. Fully client-side.",
    url: "https://devkit.yaro-labs.com/base64",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder / Decoder | devkit",
    description: "Encode text or data to Base64 and decode Base64 strings back. Fully client-side.",
    images: ["/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Base64 Encoder / Decoder",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://devkit.yaro-labs.com/base64",
  description: "Encode text or data to Base64 and decode Base64 strings back. Fully client-side.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Yaro Labs", url: "https://yaro-labs.com" },
}

export default function Base64Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Base64Client />
    </>
  )
}
