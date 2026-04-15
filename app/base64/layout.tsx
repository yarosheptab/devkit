import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Base64 Codec",
  description: "Encode or decode Base64 strings. Runs entirely in your browser.",
  openGraph: { images: [{ url: "/og/base64.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/base64.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
