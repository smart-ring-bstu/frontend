import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

/** Главная кнопка с градиентом (Войти, Создать аккаунт...) */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
}

function Button({ isLoading = false, loadingText = 'Подождите…', disabled, children, ...props }: ButtonProps) {
  return (
    <button className={styles.button} disabled={disabled || isLoading} {...props}>
      {isLoading ? loadingText : children}
    </button>
  )
}

export default Button
