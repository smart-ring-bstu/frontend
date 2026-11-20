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

// ---------------- Товары ----------------

/*
  id цвета — ключ, по которому CSS понимает, каким градиентом красить кольцо
  (см. ProductPage.module.css, классы .color-brand и т.д.).
  Сами HEX-цвета на сайте живут только в CSS-переменных.
*/
export type RingColorId = 'brand' | 'rose' | 'mint' | 'sand'

export interface RingColor {
  id: RingColorId
  name: string // подпись под кружками: «Фирменный градиент»
}

/** Варианты гравировки. Блок в макете ещё дорабатывают (правки для дизайнеров, п.1) */
export type EngravingId = 'none' | 'photo' | 'custom'

export interface EngravingOption {
  id: EngravingId
  name: string
}

/** Строка таблицы характеристик: «Связь — Bluetooth, NFC» */
export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: number
  name: string
  tagline: string // подзаголовок в шапке
  price: number // в рублях, целое число — форматируем при выводе
  description: string
  sizes: number[]
  colors: RingColor[]
  engravings: EngravingOption[]
  specs: ProductSpec[]
}
