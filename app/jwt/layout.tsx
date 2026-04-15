import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "JWT Decoder",
  description: "Decode and inspect JWT tokens. View header, payload, and signature.",
  openGraph: { images: [{ url: "/og/jwt.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/jwt.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
