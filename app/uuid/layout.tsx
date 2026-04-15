import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "UUID Generator",
  description: "Generate UUID v4 identifiers. Bulk generate up to 100 at a time.",
  openGraph: { images: [{ url: "/og/uuid.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/uuid.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
