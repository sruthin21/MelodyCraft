import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppBar from './components/AppBar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MusicApp - Discover Your Sound',
  description: 'Unleash the power of music with our cutting-edge application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className='flex flex-col min-h-screen bg-gradient-to-r from-zinc-800 to-indigo-600'>
        <AppBar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
        <Footer />
        </div>
      </body>
    </html>
  )
}
