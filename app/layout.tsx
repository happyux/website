import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'happyux.ai - AI-Powered UX Design for Tech Startups',
  description: 'Elevate your digital products with our cutting-edge AI solutions that blend data-driven insights with human creativity. Rapid delivery for tech startups.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}