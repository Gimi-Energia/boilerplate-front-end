'use client'

import { createContext, ReactNode, useContext, useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'

import { useFetchUser, useSignIn } from '@/hooks'
import { useUserStore } from '@/stores'
import { colorThemeOpt, IUser } from '@/types'

interface UserContextType {
  user?: IUser
  isLoading: boolean
  refetchUser: () => void
  error?: Error | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { readonly children: ReactNode }) {
  const { setUser } = useUserStore()
  const { setTheme } = useTheme()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { signInAsync } = useSignIn()

  const {
    data: user,
    isPending: isLoading,
    refetch,
    error,
  } = useFetchUser(userId, !!userId)

  useEffect(() => {
    if (user) {
      setUser(user)
      setTheme(user?.theme ?? 'dark')
      const colorValue = user?.color ?? colorThemeOpt.green
      document.documentElement.style.setProperty('--primary', colorValue)
    }
  }, [user, setUser, setTheme])

  useEffect(() => {
    if (!session?.user.id) {
      signInAsync()
    }
  }, [session?.user.id, signInAsync])

  return (
    <UserContext.Provider
      value={{ user, isLoading, refetchUser: refetch, error }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser deve ser usado dentro de UserProvider')
  return context
}
