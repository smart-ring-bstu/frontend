/*
  Типы данных, которыми сайт обменивается с сервером — наш «контракт» с бэком.
  Когда Данил выдаст Swagger/OpenAPI — сверяем поля и правим ТОЛЬКО здесь.
*/

export interface User {
  id: number
  name: string
  email: string
}

export interface LoginRequest {
  email: string
  password: string
}

/** «Повторите пароль» и галочку согласия на сервер не шлём — это проверки на сайте */
export interface RegisterRequest {
  name: string
  email: string
  password: string
}

/** Ответ сервера при успешном входе или регистрации */
export interface AuthResponse {
  token: string // JWT или cookie — открытый вопрос к бэку
  user: User
}
