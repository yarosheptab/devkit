import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Hash Generator",
  description: "Compute MD5, SHA-1, SHA-256, SHA-512 hashes using the Web Crypto API.",
  openGraph: { images: [{ url: "/og/hash.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/hash.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
