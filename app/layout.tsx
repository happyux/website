import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'happyux.ai - AI-Powered UX Design for Tech Startups',
  description: 'AI-powered UX design services for tech startups. Rapid innovation, intelligent experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}