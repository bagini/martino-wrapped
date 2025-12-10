import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { PostHogProvider } from "../components/PostHogProvider"

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
      <body className="font-sans">
        <PostHogProvider>
          {children}
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  )
}