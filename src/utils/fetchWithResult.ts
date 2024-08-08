import type { ResultAsync } from '../types/result'

const fetchWithResult = async (
  url: URL | RequestInfo,
  init?: RequestInit,
): ResultAsync<Response> => {
  try {
    const res = await fetch(url, init)
    if (!res.ok) throw new Error(res.statusText)
    return { isSuccess: true, value: res }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An error occurred'
    return { isSuccess: false, error: message }
  }
}

export { fetchWithResult as fetch }
