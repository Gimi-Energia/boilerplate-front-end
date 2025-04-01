/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

import { IUser } from './types/user'

declare module 'next-auth/jwt' {
  interface JWT {
    name: string
    email: string
    accessToken: string
    tempToken: string
    accessTokenExpiration: number
    id: string
    is_logistics_admin: boolean
    theme?: theme
    color?: string
  }
}

declare module 'next-auth' {
  interface User {
    name: string
    email: string
    id: string
    tempToken: string
    accessToken: string
    accessTokenExpiration: number
    is_logistics_admin: boolean
    theme?: theme
    color?: string
  }

  interface Session {
    tempToken: string
    accessToken: string
    id: string
    user: User
  }
}
