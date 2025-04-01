'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { env } from '@/env'
import { useHandleError } from '@/hooks'
import { HttpStatus } from '@/types'

export function useSignIn() {
  const { handleError } = useHandleError()
  const router = useRouter()

  const signInAsync = useCallback(async () => {
    try {
      const response = await signIn('credentials', { redirect: false })

      if (response?.status === HttpStatus.Unauthorized) {
        throw new Error('Usuário não autenticado. Redirecionando para o GimiX.')
      }
    } catch (err) {
      handleError(err)
      router.push(env.NEXT_PUBLIC_GIMIX_APP)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { signInAsync }
}
