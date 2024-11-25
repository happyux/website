import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HappyUX.ai - AI-Powered UX Design for Tech Startups',
  description: 'Revolutionize your digital experience with AI-driven UX design solutions tailored for tech startups. Fast, innovative, and user-centric.',
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