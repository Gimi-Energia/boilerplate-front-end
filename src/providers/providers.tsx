'use client'

import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from '@/context/auth-context'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}

export { Providers }
