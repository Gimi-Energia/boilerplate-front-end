import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

const apiBrasil = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BRASIL_API_BASE_URL,
})

export { api, apiBrasil }
