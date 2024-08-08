export type Result<T> =
  | {
      isSuccess: true
      value: T
    }
  | {
      isSuccess: false
      error: string
    }

export type ResultAsync<T> = Promise<Result<T>>
