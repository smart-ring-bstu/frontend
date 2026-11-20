import { ApiError } from './errors'
import type { Product } from './types'

/*
  Слой API для товаров. Страницы НЕ делают fetch сами — только getProduct().
  Пока бэка нет, USE_MOCK = true и данные берутся из MOCK_PRODUCTS ниже
  (тексты и характеристики — из макета).
*/
const USE_MOCK = true

// Адрес и пути — предположение, согласовать с бэком (AURING_context.md, п.7)
const API_URL = 'http://localhost:8080/api'

// ---------------- Заглушка ----------------

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Смарт-кольцо',
    tagline: 'Платежи, пульс и связь с телефоном в тонком ободке.',
    price: 19900,
    description:
      'Кольцо с NFC, Bluetooth, датчиком пульса и беспроводной зарядкой. Подставка в комплекте.',
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: [
      { id: 'brand', name: 'Фирменный градиент' },
      // В макете подписан только первый цвет — остальные названия временные, уточнить у дизайнера
      { id: 'rose', name: 'Розовый закат' },
      { id: 'mint', name: 'Мятный' },
      { id: 'sand', name: 'Песочный' },
    ],
    engravings: [
      { id: 'none', name: 'Без гравировки' },
      { id: 'photo', name: 'Гравировка по фото' },
      { id: 'custom', name: 'Своя надпись' },
    ],
    specs: [
      { label: 'Датчики', value: 'пульс, температура, движение' },
      { label: 'Связь', value: 'Bluetooth, NFC' },
      { label: 'Работа без зарядки', value: 'до 7 дней' },
      { label: 'Водозащита', value: 'до 50 м' },
      { label: 'Комплект', value: 'кольцо, подставка, кабель' },
    ],
  },
]

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function mockGetProduct(id: number): Promise<Product> {
  await delay(400) // имитируем сеть, чтобы видеть состояние «загрузка»
  const product = MOCK_PRODUCTS.find((item) => item.id === id)
  if (!product) throw new ApiError('Товар не найден', 404)
  return product
}

// ---------------- Настоящий запрос ----------------

async function realGetProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`)
  if (!response.ok) {
    const message = response.status === 404 ? 'Товар не найден' : 'Ошибка сервера, попробуйте позже'
    throw new ApiError(message, response.status)
  }
  return (await response.json()) as Product
}

/** Получить товар по id */
export function getProduct(id: number): Promise<Product> {
  return USE_MOCK ? mockGetProduct(id) : realGetProduct(id)
}
