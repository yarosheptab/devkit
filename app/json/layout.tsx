import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "JSON Formatter",
  description: "Format, validate, and minify JSON. Works entirely in your browser.",
  openGraph: { images: [{ url: "/og/json.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/json.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
