import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Regex Tester",
  description: "Test regular expressions with live match highlighting.",
  openGraph: { images: [{ url: "/og/regex.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/regex.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
