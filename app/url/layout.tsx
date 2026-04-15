import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "URL Encoder",
  description: "Encode and decode URL components and query strings.",
  openGraph: { images: [{ url: "/og/url.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/url.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
