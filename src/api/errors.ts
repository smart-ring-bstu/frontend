/** Ошибка от API с понятным пользователю текстом */
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/** Превращает любую ошибку в текст для пользователя */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message
  // fetch падает с TypeError, если сервер недоступен
  return 'Не удалось подключиться к серверу. Попробуйте позже.'
}
