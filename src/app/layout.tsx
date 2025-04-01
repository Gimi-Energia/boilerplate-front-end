import type { Metadata } from 'next'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'

import { AppSidebar } from '@/components/app-sidebar'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers'
import { authOptions } from '@/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Portal da ISO',
    default: 'Portal da ISO',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      <body
        className={cn('flex min-h-screen w-full flex-col', inter.className)}
      >
        <Providers session={session}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <main className="flex w-full flex-1 justify-center p-4 bg-zinc-100 dark:bg-zinc-800">
                <div className="w-full flex justify-center max-w-full">
                  {children}
                </div>
              </main>
              <Footer />
            </SidebarInset>
            <Toaster />
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}
