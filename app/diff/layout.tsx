import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Text Diff",
  description: "Compare two texts side by side. Highlight additions and removals.",
  openGraph: { images: [{ url: "/og/diff.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/diff.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
