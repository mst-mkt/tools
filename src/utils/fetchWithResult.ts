import type { ResultAsync } from '../types/result'

const fetchWithResult = async (
  url: URL | RequestInfo,
  init?: RequestInit,
): ResultAsync<Response> => {
  try {
    const res = await fetch(url, init)
    if (!res.ok) throw new Error(`HTTP error: ${res.status} ${await res.text()}`)
    return { isSuccess: true, value: res }
  } catch (e) {
    console.error(e)
    const message = e instanceof Error ? e.message : 'An error occurred'
    return { isSuccess: false, error: message }
  }
}

export { fetchWithResult as fetch }
