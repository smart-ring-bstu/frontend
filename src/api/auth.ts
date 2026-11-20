import { ApiError } from './errors'
import type { AuthResponse, LoginRequest, RegisterRequest } from './types'

/*
  Слой API для входа и регистрации.
  Компоненты НЕ вызывают fetch сами — только login() и register() отсюда.

  Пока бэка нет, USE_MOCK = true: данные живут в памяти браузера
  и пропадают после перезагрузки страницы.
  Тестовый аккаунт: test@auring.ru / 12345678
*/
const USE_MOCK = true

// Адрес и пути — предположение, согласовать с бэком (AURING_context.md, п.7)
const API_URL = 'http://localhost:8080/api'

// ---------------- Заглушка ----------------

interface MockUser {
  id: number
  name: string
  email: string
  password: string
}

const mockUsers: MockUser[] = [
  { id: 1, name: 'Тестовый пользователь', email: 'test@auring.ru', password: '12345678' },
]

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function toAuthResponse(user: MockUser): AuthResponse {
  return {
    token: `mock-token-${user.id}`,
    user: { id: user.id, name: user.name, email: user.email },
  }
}

async function mockLogin(data: LoginRequest): Promise<AuthResponse> {
  await delay(700) // имитируем сеть, чтобы видеть состояние «загрузка»
  const email = data.email.toLowerCase()
  const user = mockUsers.find((u) => u.email === email && u.password === data.password)
  if (!user) throw new ApiError('Неверный email или пароль', 401)
  return toAuthResponse(user)
}

async function mockRegister(data: RegisterRequest): Promise<AuthResponse> {
  await delay(700)
  const email = data.email.toLowerCase()
  if (mockUsers.some((u) => u.email === email)) {
    throw new ApiError('Пользователь с таким email уже зарегистрирован', 409)
  }
  const user: MockUser = { id: mockUsers.length + 1, name: data.name, email, password: data.password }
  mockUsers.push(user)
  return toAuthResponse(user)
}

// ---------------- Настоящие запросы ----------------

function messageForStatus(status: number): string {
  if (status === 400) return 'Проверьте введённые данные'
  if (status === 401) return 'Неверный email или пароль'
  if (status === 409) return 'Пользователь с таким email уже зарегистрирован'
  return 'Ошибка сервера, попробуйте позже'
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new ApiError(messageForStatus(response.status), response.status)
  return (await response.json()) as T
}

// ---------------- То, что видят компоненты ----------------

export function login(data: LoginRequest): Promise<AuthResponse> {
  return USE_MOCK ? mockLogin(data) : post<AuthResponse>('/auth/login', data)
}

export function register(data: RegisterRequest): Promise<AuthResponse> {
  return USE_MOCK ? mockRegister(data) : post<AuthResponse>('/auth/register', data)
}
