import type { Metadata } from "next"
import DiffClient from "./diff-client"

export const metadata: Metadata = {
  title: "Text Diff Tool",
  description: "Compare two texts side by side with line-by-line diff highlighting. Spot additions, deletions, and changes instantly.",
  keywords: ["text diff", "compare text", "text comparison tool", "diff checker", "side by side diff"],
  openGraph: {
    title: "Text Diff Tool | devkit",
    description: "Compare two texts side by side with line-by-line diff highlighting. Spot additions, deletions, and changes instantly.",
    url: "https://devkit.yaro-labs.com/diff",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Diff Tool | devkit",
    description: "Compare two texts side by side with line-by-line diff highlighting. Spot additions, deletions, and changes instantly.",
    images: ["/og/home.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Diff Tool",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://devkit.yaro-labs.com/diff",
  description: "Compare two texts side by side with line-by-line diff highlighting. Spot additions, deletions, and changes instantly.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Yaro Labs", url: "https://yaro-labs.com" },
}

export default function DiffPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DiffClient />
    </>
  )
}
