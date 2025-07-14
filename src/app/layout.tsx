import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Frameport - Modern Photo Sharing for Photographers',
  description: 'A modern, secure photo sharing platform for photographers to collaborate with clients.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-gray-50 text-gray-900 antialiased')}>
        {children}
      </body>
    </html>
  )
}