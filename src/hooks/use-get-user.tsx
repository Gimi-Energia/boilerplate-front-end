import { useFetchData } from '@/hooks'
import { Queries } from '@/lib/react-query'
import { AuthService } from '@/services/session.service'
import { IUser } from '@/types'

export function useFetchUser(userId?: string, enabled?: boolean) {
  return useFetchData<IUser>(
    [Queries.user],
    async () => {
      if (!userId) throw new Error('Usuário não informado')
      const user = await AuthService.getAllUser({ userId })
      return user
    },
    {
      enabled: enabled ?? true,
    },
  )
}
