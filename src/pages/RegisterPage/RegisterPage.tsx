import { useState } from 'react'
import type { FormEvent } from 'react'
import { register } from '../../api/auth'
import { getErrorMessage } from '../../api/errors'
import type { User } from '../../api/types'
import { isValidEmail, MIN_PASSWORD_LENGTH } from '../../utils/validation'
import PageLayout from '../../components/PageLayout/PageLayout'
import AuthCard from '../../components/AuthCard/AuthCard'
import TextField from '../../components/TextField/TextField'
import Button from '../../components/Button/Button'
import styles from '../authForm.module.css'

type Field = 'name' | 'email' | 'password' | 'passwordRepeat' | 'agree'
type FieldErrors = Partial<Record<Field, string>>

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [agree, setAgree] = useState(false)

  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  function validate(): FieldErrors {
    const result: FieldErrors = {}
    if (!name.trim()) result.name = 'Введите имя'

    if (!email.trim()) result.email = 'Введите email'
    else if (!isValidEmail(email)) result.email = 'Некорректный email'

    if (password.length < MIN_PASSWORD_LENGTH) {
      result.password = `Пароль — не короче ${MIN_PASSWORD_LENGTH} символов`
    }
    if (passwordRepeat !== password) result.passwordRepeat = 'Пароли не совпадают'
    if (!agree) result.agree = 'Нужно согласие с условиями'
    return result
  }

  function clearError(field: Field) {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)
    setFormError(null)
    if (Object.keys(validationErrors).length > 0) return

    setIsLoading(true)
    try {
      const response = await register({ name: name.trim(), email: email.trim(), password })
      // TODO: сохранить токен и перейти в ЛК
      setUser(response.user)
    } catch (error) {
      setFormError(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageLayout title="Регистрация" subtitle="Создайте аккаунт за минуту.">
      <AuthCard
        title="Создайте аккаунт"
        subtitle="Сохраните адрес, следите за заказом и управляйте кольцом."
      >
        {user ? (
          <p className={styles.success}>
            Аккаунт создан, <b>{user.name}</b>! Теперь можно <a href="#/login">войти</a>.
          </p>
        ) : (
          <>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <TextField
                label="Имя"
                autoComplete="given-name"
                placeholder="Как к вам обращаться"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  clearError('name')
                }}
                error={errors.name}
                disabled={isLoading}
              />

              <TextField
                label="Электронная почта"
                type="email"
                autoComplete="email"
                placeholder="name@mail.ru"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearError('email')
                }}
                error={errors.email}
                disabled={isLoading}
              />

              <TextField
                label="Пароль"
                type="password"
                autoComplete="new-password"
                placeholder={`Не короче ${MIN_PASSWORD_LENGTH} символов`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  clearError('password')
                }}
                error={errors.password}
                disabled={isLoading}
              />

              <TextField
                label="Повторите пароль"
                type="password"
                autoComplete="new-password"
                placeholder="Ещё раз пароль"
                value={passwordRepeat}
                onChange={(e) => {
                  setPasswordRepeat(e.target.value)
                  clearError('passwordRepeat')
                }}
                error={errors.passwordRepeat}
                disabled={isLoading}
              />

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked)
                    clearError('agree')
                  }}
                  disabled={isLoading}
                />
                <span>Я согласен с условиями и политикой конфиденциальности</span>
              </label>
              {errors.agree && <p className={styles.fieldError}>{errors.agree}</p>}

              {formError && (
                <p className={styles.formError} role="alert">
                  {formError}
                </p>
              )}

              <Button type="submit" isLoading={isLoading} loadingText="Создаём…">
                Создать аккаунт
              </Button>
            </form>

            <p className={styles.switch}>
              Уже есть аккаунт? <a href="#/login">Войти</a>
            </p>
          </>
        )}
      </AuthCard>
    </PageLayout>
  )
}

export default RegisterPage
