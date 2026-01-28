import React from "react"
import type { Metadata } from 'next'
import { Poppins, Bungee, Pacifico } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

const bungee = Bungee({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display"
});

const pacifico = Pacifico({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-accent"
});

export const metadata: Metadata = {
  title: 'Superteam Brazil - Build the Future of Web3',
  description: 'Join the leading Solana community in Latin America. Connect with developers, creators, and Web3 enthusiasts.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${bungee.variable} ${pacifico.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
