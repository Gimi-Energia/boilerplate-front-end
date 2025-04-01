import { NextApiRequest } from 'next'
import { NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { parseCookies } from 'nookies'

import { AuthService } from '@/services'
import { TokenAuthUtils } from '@/utils'

const getTempTokenFromCookie = (req: NextApiRequest) => {
  const { tempToken } = parseCookies()
  const cookies = parseCookies({ req })

  return cookies.tempToken || tempToken
}
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'GimixLogin',
      credentials: {
        tempToken: { label: 'Temp Token', type: 'text' },
      },
      async authorize(credentials, req) {
        const tempToken =
          credentials?.tempToken ??
          getTempTokenFromCookie(req as NextApiRequest)

        if (!tempToken) {
          throw new Error('No tempToken found')
        }
        try {
          const response = await AuthService.login({
            tempToken,
          })
          const decoded = TokenAuthUtils.getDecodedToken(response.accessToken)

          if (!decoded) {
            throw new Error('invalid token')
          }

          return {
            email: decoded.email,
            name: decoded.name,
            accessToken: response.accessToken,
            accessTokenExpiration: decoded.exp,
            id: response.user.id,
            tempToken,
            is_logistics_admin: response.user.is_logistics_admin,
            image: response.user.picture,
            theme: response.user.theme,
            color: response.user.color,
          }
        } catch (err: unknown) {
          console.error('Authorize error:', err)
          throw new Error(String(err))
        }
      },
    }),
  ],
  debug: true,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 10,
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user,
          tempToken: user.tempToken,
          accessToken: user.accessToken,
          accessTokenExpiration: user.accessTokenExpiration,
          id: user.id,
        }
      }
      const isTokenExpired = Date.now() > token.accessTokenExpiration * 1000

      if (isTokenExpired) {
        return { ...token, error: 'AccessTokenExpired' }
      }

      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken
      session.tempToken = token.tempToken
      session.id = token.id
      Object.assign(session, token)
      return session
    },
  },
}

export { authOptions }
