import type { Metadata } from "next"
import JsonClient from "./json-client"

export const metadata: Metadata = {
  title: "JSON Formatter & Validator",
  description: "Format, validate, and minify JSON online. Syntax highlighting, error detection, and minification — entirely in your browser.",
  keywords: ["JSON formatter", "JSON validator", "JSON beautifier", "format JSON online", "JSON minifier"],
  openGraph: {
    title: "JSON Formatter & Validator | devkit",
    description: "Format, validate, and minify JSON online. Syntax highlighting, error detection, and minification — entirely in your browser.",
    url: "https://devkit.yaro-labs.com/json",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator | devkit",
    description: "Format, validate, and minify JSON online. Syntax highlighting, error detection, and minification — entirely in your browser.",
    images: ["/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON Formatter",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://devkit.yaro-labs.com/json",
  description: "Format, validate, and minify JSON online. Syntax highlighting, error detection, and minification — entirely in your browser.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Yaro Labs", url: "https://yaro-labs.com" },
}

export default function JsonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonClient />
    </>
  )
}
