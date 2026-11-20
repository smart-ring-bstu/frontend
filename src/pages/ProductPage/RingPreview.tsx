import type { EngravingId, EngravingOption, RingColor, RingColorId } from '../../api/types'
import styles from './RingPreview.module.css'

/*
  Тёмная плашка слева: большое кольцо + выбор цвета + выбор гравировки.
  Сам компонент ничего не «помнит» — выбранные значения хранит страница
  и передаёт сюда через props, а о кликах мы сообщаем ей через onColorChange / onEngravingChange.
  Так данные лежат в одном месте, и кнопка «В корзину» видит, что выбрано.
*/
interface RingPreviewProps {
  colors: RingColor[]
  engravings: EngravingOption[]
  colorId: RingColorId
  engravingId: EngravingId
  onColorChange: (id: RingColorId) => void
  onEngravingChange: (id: EngravingId) => void
}

// Record<RingColorId, string> — «для КАЖДОГО id цвета есть CSS-класс». Забудем один — TS подскажет.
const COLOR_CLASS: Record<RingColorId, string> = {
  brand: styles.brand,
  rose: styles.rose,
  mint: styles.mint,
  sand: styles.sand,
}

function CameraIcon() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" aria-hidden="true" className={styles.icon}>
      <path d="M7 1h8l1.6 2.4H20a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4.4a1 1 0 0 1 1-1h3.4z" />
      <circle cx="11" cy="10" r="4" className={styles.iconLens} />
    </svg>
  )
}

function RingPreview({
  colors,
  engravings,
  colorId,
  engravingId,
  onColorChange,
  onEngravingChange,
}: RingPreviewProps) {
  const colorName = colors.find((color) => color.id === colorId)?.name
  const engravingName = engravings.find((option) => option.id === engravingId)?.name

  return (
    <div className={styles.preview}>
      <div className={`${styles.ring} ${COLOR_CLASS[colorId]}`} role="img" aria-label={`Кольцо: ${colorName}`} />

      {/* role="radiogroup" — для экранных дикторов это «выбор одного из нескольких» */}
      <div className={styles.options} role="radiogroup" aria-label="Цвет кольца">
        {colors.map((color) => (
          <button
            key={color.id}
            type="button"
            role="radio"
            aria-checked={color.id === colorId}
            aria-label={color.name}
            className={`${styles.swatch} ${COLOR_CLASS[color.id]}`}
            onClick={() => onColorChange(color.id)}
          />
        ))}
      </div>
      <p className={styles.caption}>{colorName}</p>

      <div className={`${styles.options} ${styles.engravings}`} role="radiogroup" aria-label="Гравировка">
        {engravings.map((option) => (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={option.id === engravingId}
            aria-label={option.name}
            className={`${styles.swatch} ${styles[`engraving-${option.id}`]}`}
            onClick={() => onEngravingChange(option.id)}
          >
            {option.id === 'photo' && <CameraIcon />}
            {option.id === 'custom' && <span className={styles.customText}>СВОЯ</span>}
          </button>
        ))}
      </div>
      <p className={styles.caption}>{engravingName}</p>
    </div>
  )
}

export default RingPreview
