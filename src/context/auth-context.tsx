'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { Spinner } from '@/components/spinner'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/services/api'
import { ICredentials } from '@/types/credentials'
import { IUser } from '@/types/user'

interface ApiError {
  response?: {
    data?: {
      error?: string
    }
  }
}

type IAuthContext = {
  signIn: (credentials: ICredentials) => Promise<void>
  signOut: () => void
  user: IUser | null
  isAuthenticated: boolean
}

type IAuthProvider = {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  const { token, userId } = parseCookies()
  const isAuthenticated = !!token

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  useEffect(() => {
    const isPublicRoute = /^\/(checklist|login)(\/.*)?$/.test(pathname)

    if (!userId && !isPublicRoute && pathname !== '/') {
      destroyCookie(undefined, 'token')
      destroyCookie(undefined, 'refreshToken')
      destroyCookie(undefined, 'userId')
      setUser(null)
      router.replace('/')
      setLoading(false)
    } else if (userId) {
      api
        .get(`users/${userId}/`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(({ data }) => {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
          })
        })
        .catch(() => {
          destroyCookie(undefined, 'token')
          destroyCookie(undefined, 'refreshToken')
          destroyCookie(undefined, 'userId')
          setUser(null)
          if (!isPublicRoute) {
            router.replace('/')
          }
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const signIn = async ({ email, password }: ICredentials): Promise<void> => {
    try {
      const { data: dataToken } = await api.post('token/', {
        email,
        password,
      })

      const token = dataToken.access

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      const { data } = await api.get(`users/${dataToken.user_id}/`)

      setCookie(undefined, 'token', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })
      setCookie(undefined, 'refresh-token', dataToken.refresh, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })
      setCookie(undefined, 'userId', data.id, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })
      setCookie(undefined, 'userType', data.type, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })

      const userInfo = {
        id: data.id,
        name: data.name,
        email: data.email,
        company: data.company,
        isAdmin: data.is_admin,
      }

      setUser(userInfo)

      toast({
        title: 'Sucesso ao realizar o login!',
      })

      router.replace('/dashboard')
    } catch (error) {
      const apiError = error as ApiError

      toast({
        title: apiError.response?.data?.error || 'Erro ao realizar login',
        variant: 'destructive',
      })
    }
  }

  const signOut = async (): Promise<void> => {
    destroyCookie(undefined, 'token')
    destroyCookie(undefined, 'refreshToken')
    destroyCookie(undefined, 'userId')
    setUser(null)
    router.replace('/')
  }

  if (loading && !/^\/(checklist|login)(\/.*)?$/.test(pathname)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
