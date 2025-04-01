import axios from 'axios'
import { parseCookies } from 'nookies'

import { env } from '@/env'

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL: `${baseURL}/api`,
  })

  instance.interceptors.request.use((config) => {
    const { token } = parseCookies()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  return instance
}

const api = createAxiosInstance(env.NEXT_PUBLIC_API_BASE_URL)
const gimixApi = createAxiosInstance(env.NEXT_PUBLIC_GIMIX_API_BASE_URL)

export { api, gimixApi }
