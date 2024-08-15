import type { ResultAsync } from '../types/result'
import { fetch } from './fetchWithResult'

export const basicAuthFetch = async (
  url: URL | RequestInfo,
  { username, password }: { username: string; password: string },
  init?: RequestInit,
): ResultAsync<Response> => {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      // biome-ignore lint/style/useNamingConvention: Authorization is a standard HTTP header
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  })
  return res
}
