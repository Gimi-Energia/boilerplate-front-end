'use client'

import { useToast } from '@/hooks'

const useHandleError = () => {
  const { toast } = useToast()

  function extractErrorMessage(error: unknown): string {
    if (error instanceof Response) {
      return `Erro ${error.status}: ${error.statusText}`
    }

    if (typeof error === 'object' && error !== null) {
      if ('message' in error) {
        return String(error.message)
      }
      if ('detail' in error) {
        return String(error.detail)
      }
      if ('error' in error) {
        return String(error.error)
      }
    }

    return error instanceof Error ? error.message : 'Erro desconhecido.'
  }

  function handleError(error: unknown, title = 'Erro') {
    toast({
      title,
      description: extractErrorMessage(error),
      variant: 'destructive',
    })
  }

  return { handleError }
}

export { useHandleError }
