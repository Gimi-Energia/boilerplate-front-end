import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | project',
    default: 'project',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn('flex h-screen flex-col text-zinc-800', inter.className)}
      >
        <Providers>
          <main className="flex w-full flex-1 justify-center py-4">
            <div className="w-full sm:max-w-screen-md lg:max-w-screen-lg">
              {children}
            </div>
          </main>
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
