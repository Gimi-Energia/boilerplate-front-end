'use client'
import { ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { ThemeProvider, UserProvider } from '@/context'
import { useQueryClient } from '@/hooks'
import { useUserStore } from '@/stores'

interface MyAppProps {
  session: Session | null
  children: ReactNode
}

const Providers = ({ children, session }: MyAppProps) => {
  const queryClient = useQueryClient()
  const { user } = useUserStore()
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider
        session={session}
        refetchOnWindowFocus={false}
        refetchWhenOffline={false}
        basePath="/api/auth"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={user?.theme}
          enableSystem
          disableTransitionOnChange
        >
          {' '}
          <UserProvider>{children} </UserProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export { Providers }
