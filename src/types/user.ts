import { theme, ICard } from '@/types'

export type IUser = {
  id: string
  email: string
  name: string
  company: string
  theme: theme
  color: string
  picture: string
  is_margin_admin: boolean
  is_logistics_admin: boolean
  is_iso_admin: boolean
  cards: ICard[]
}

export interface IUserLogin {
  exp: number
  iat: number
  id: string
  name: string
  token: string
  tempToken: string
  email: string
}
