import { z } from 'zod'

export const WHOIS_API_KEY = z.string().parse(import.meta.env.VITE_WHOIS_API_KEY)
