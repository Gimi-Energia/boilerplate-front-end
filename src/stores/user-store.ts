import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { IUser } from '@/types/user'

interface UserState {
  user: IUser | null
  accessToken: string | null
  setUser: (user: IUser) => void
  setAccessToken: (token: string) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearUser: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'user-store',
    },
  ),
)
