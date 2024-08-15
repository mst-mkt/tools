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
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  })
  return res
}
