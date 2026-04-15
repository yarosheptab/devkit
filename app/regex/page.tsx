import type { Metadata } from "next"
import RegexClient from "./regex-client"

export const metadata: Metadata = {
  title: "Regex Tester",
  description: "Test regular expressions with live match highlighting. Supports JavaScript regex flags. Runs entirely in your browser.",
  keywords: ["regex tester", "regular expression tester", "regex matcher", "test regex online", "regex debugger"],
  openGraph: {
    title: "Regex Tester | devkit",
    description: "Test regular expressions with live match highlighting. Supports JavaScript regex flags. Runs entirely in your browser.",
    url: "https://devkit.yaro-labs.com/regex",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Tester | devkit",
    description: "Test regular expressions with live match highlighting. Supports JavaScript regex flags. Runs entirely in your browser.",
    images: ["/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Regex Tester",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://devkit.yaro-labs.com/regex",
  description: "Test regular expressions with live match highlighting. Supports JavaScript regex flags. Runs entirely in your browser.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Yaro Labs", url: "https://yaro-labs.com" },
}

export default function RegexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RegexClient />
    </>
  )
}
