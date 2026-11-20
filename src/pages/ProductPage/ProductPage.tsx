import { useEffect, useState } from 'react'
import { getProduct } from '../../api/products'
import { getErrorMessage } from '../../api/errors'
import type { EngravingId, Product, RingColorId } from '../../api/types'
import PageLayout from '../../components/PageLayout/PageLayout'
import Button from '../../components/Button/Button'
import RingPreview from './RingPreview'
import styles from './ProductPage.module.css'

// Пока товар один. Когда появится каталог, id будем брать из адреса (#/product/1)
const PRODUCT_ID = 1

// 19900 → «19 900 ₽» (пробелы между тысячами — по правилам русского языка)
const priceFormat = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

/*
  Внешняя часть страницы: загружает товар и показывает «Загрузка…» или ошибку.

  useEffect — «сделай это ПОСЛЕ того, как страница нарисовалась».
  Загрузка данных — как раз такой случай: сначала показываем «Загрузка…»,
  потом приходит ответ, и React перерисовывает страницу уже с товаром.
  [] в конце — запустить один раз, при первом показе страницы.
*/
function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Если пользователь ушёл со страницы до ответа — не трогаем state «мёртвого» компонента
    let isActive = true
    getProduct(PRODUCT_ID)
      .then((data) => {
        if (isActive) setProduct(data)
      })
      .catch((err: unknown) => {
        if (isActive) setError(getErrorMessage(err))
      })
    return () => {
      isActive = false
    }
  }, [])

  if (error) {
    return (
      <PageLayout title="Смарт-кольцо">
        <p className={styles.status}>{error}</p>
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout title="Смарт-кольцо">
        <p className={styles.status}>Загрузка…</p>
      </PageLayout>
    )
  }

  return <ProductView product={product} />
}

/*
  Сама карточка. Вынесена отдельно, чтобы здесь product был ТОЧНО загружен
  (тип Product, а не Product | null) — и можно сразу задать цвет по умолчанию.
*/
function ProductView({ product }: { product: Product }) {
  const [size, setSize] = useState<number | null>(null) // null = размер ещё не выбран
  const [colorId, setColorId] = useState<RingColorId>(product.colors[0].id)
  const [engravingId, setEngravingId] = useState<EngravingId>(product.engravings[0].id)
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null)

  function handleAddToCart() {
    if (size === null) {
      setMessage({ text: 'Сначала выберите размер', isError: true })
      return
    }
    // TODO: когда будет корзина — вызывать addToCart() из src/api/cart.ts
    const colorName = product.colors.find((color) => color.id === colorId)?.name
    setMessage({ text: `Добавлено в корзину: размер ${size}, ${colorName}`, isError: false })
  }

  function handleSizeClick(value: number) {
    setSize(value)
    setMessage(null) // убираем старое сообщение, раз выбор изменился
  }

  return (
    <PageLayout title={product.name} subtitle={product.tagline}>
      <section className={styles.product}>
        <RingPreview
          colors={product.colors}
          engravings={product.engravings}
          colorId={colorId}
          engravingId={engravingId}
          onColorChange={setColorId}
          onEngravingChange={setEngravingId}
        />

        <div className={styles.info}>
          <p className={styles.price}>{priceFormat.format(product.price)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.sizeBlock}>
            <p className={styles.label} id="size-label">
              Размер
            </p>
            <div className={styles.sizes} role="radiogroup" aria-labelledby="size-label">
              {product.sizes.map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={value === size}
                  className={styles.size}
                  onClick={() => handleSizeClick(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            {/* TODO: страница или окно «Как подобрать размер» — в макете пока нет */}
            <a href="#/size-guide" className={styles.sizeGuide}>
              Как подобрать размер
            </a>
          </div>

          <div className={styles.cart}>
            <Button type="button" fullWidth={false} onClick={handleAddToCart}>
              Добавить в корзину
            </Button>
            {/* aria-live — экранный диктор прочитает сообщение, когда оно появится */}
            <p
              className={message?.isError ? `${styles.message} ${styles.error}` : styles.message}
              aria-live="polite"
            >
              {message?.text}
            </p>
          </div>

          {/* dl/dt/dd — HTML-список «название → значение», как раз для характеристик */}
          <dl className={styles.specs}>
            {product.specs.map((spec) => (
              <div key={spec.label} className={styles.spec}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </PageLayout>
  )
}

export default ProductPage
