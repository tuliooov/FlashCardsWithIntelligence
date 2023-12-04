import type { Metadata } from 'next'
import './globals.css'

// https://vercel.com/font]
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  title: 'Flash Cards With Chat GPT',
  description: 'This system enables you create flash cards with chatgpt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={GeistSans.className} lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body className="antialiased bg-mirage-50 text-mirage-950">
        {children}
      </body>
    </html>
  )
}
