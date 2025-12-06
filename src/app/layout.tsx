import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Martino × ChatGPT 2025 Wrapped",
  description: "A year of using ChatGPT as your second brain for deals, frameworks, and family life.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">{children}</body>
    </html>
  )
}
