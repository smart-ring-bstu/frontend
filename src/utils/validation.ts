/** Простая проверка формата email: «что-то@что-то.что-то» */
export function isValidEmail(email: string): boolean {
  return /^\S+@\S+\.\S+$/.test(email.trim())
}

export const MIN_PASSWORD_LENGTH = 8 // из макета: «Не короче 8 символов»
