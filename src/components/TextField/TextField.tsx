import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import styles from './TextField.module.css'

/*
  Поле ввода с подписью и текстом ошибки.
  extends InputHTMLAttributes — компонент принимает все обычные атрибуты <input>
  (type, value, onChange, placeholder...), плюс наши label и error.
*/
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

function TextField({ label, error, id, className, ...inputProps }: TextFieldProps) {
  // useId даёт уникальный id, чтобы клик по подписи ставил курсор в поле
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const inputClass = [styles.input, error ? styles.inputInvalid : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={inputClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

export default TextField
