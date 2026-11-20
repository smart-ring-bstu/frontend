import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

/** Главная кнопка с градиентом (Войти, Создать аккаунт...) */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  fullWidth?: boolean // false — кнопка по ширине текста (как «Добавить в корзину»)
}

function Button({
  isLoading = false,
  loadingText = 'Подождите…',
  fullWidth = true,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const className = fullWidth ? styles.button : `${styles.button} ${styles.auto}`
  return (
    <button className={className} disabled={disabled || isLoading} {...props}>
      {isLoading ? loadingText : children}
    </button>
  )
}

export default Button
