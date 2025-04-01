import { gimixApi } from '@/services/api'
import { ICredentials } from '@/types'
import { IUser } from '@/types/user'

type TokenPayload = {
  accessToken: string
}
type UserPayload = {
  userId: string
}
type TokenResponse = {
  access_token: string
}

type TempTokenPayload = {
  tempToken: string
}
export class AuthService {
  static async getUser(payload: TokenPayload) {
    const { data } = await gimixApi.get<IUser>('auth/me', {
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
      },
    })
    return data
  }

  static async getAllUser(payload: UserPayload) {
    const { data } = await gimixApi.get<IUser>(`users/${payload.userId}`)
    return data
  }

  static async validateTempToken(payload: TempTokenPayload) {
    const { data } = await gimixApi.post<TokenResponse>(
      `auth/validate-temp-token?temp_token=${payload.tempToken}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${payload.tempToken}`,
        },
      },
    )

    return data
  }

  static async login(payload: TempTokenPayload) {
    const { access_token: accessToken } = await this.validateTempToken({
      tempToken: payload.tempToken,
    })
    const user = await this.getUser({
      accessToken,
    })
    return { user, accessToken }
  }

  static async authorize(payload: ICredentials) {
    const { data } = await gimixApi.post('login', payload)
    return data
  }
}
