import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_GIMIX_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_GIMIX_APP: z.string().url(),
})

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_GIMIX_API_BASE_URL: process.env.NEXT_PUBLIC_GIMIX_API_BASE_URL,
  NEXT_PUBLIC_GIMIX_APP: process.env.NEXT_PUBLIC_GIMIX_APP,
})

if (!parsedEnv.success) {
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
