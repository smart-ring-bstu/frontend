import { useState } from 'react'
import type { FormEvent } from 'react'
import { login } from '../../api/auth'
import { getErrorMessage } from '../../api/errors'
import type { User } from '../../api/types'
import { isValidEmail } from '../../utils/validation'
import PageLayout from '../../components/PageLayout/PageLayout'
import AuthCard from '../../components/AuthCard/AuthCard'
import TextField from '../../components/TextField/TextField'
import Button from '../../components/Button/Button'
import styles from '../authForm.module.css'

type Field = 'email' | 'password'
// Partial<Record<...>> = объект, где у каждого поля МОЖЕТ быть текст ошибки
type FieldErrors = Partial<Record<Field, string>>

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  function validate(): FieldErrors {
    const result: FieldErrors = {}
    if (!email.trim()) result.email = 'Введите email'
    else if (!isValidEmail(email)) result.email = 'Некорректный email'
    if (!password) result.password = 'Введите пароль'
    return result
  }

  // Когда пользователь начинает исправлять поле — убираем его ошибку
  function clearError(field: Field) {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // без этого браузер перезагрузит страницу

    const validationErrors = validate()
    setErrors(validationErrors)
    setFormError(null)
    if (Object.keys(validationErrors).length > 0) return

    setIsLoading(true)
    try {
      const response = await login({ email: email.trim(), password })
      // TODO: сохранить токен и перейти в ЛК (когда решим JWT/cookie и появится ЛК)
      setUser(response.user)
    } catch (error) {
      setFormError(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageLayout title="Вход" subtitle="Войдите в аккаунт, чтобы продолжить.">
      <AuthCard title="С возвращением" subtitle="Войдите, чтобы видеть заказы и данные кольца.">
        {user ? (
          <p className={styles.success}>
            Вы вошли как <b>{user.name}</b>. Личный кабинет появится позже.
          </p>
        ) : (
          <>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
                autoComplete="current-password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  clearError('password')
                }}
                error={errors.password}
                disabled={isLoading}
              />

              {/* TODO: страницы восстановления пароля пока нет */}
              <a href="#/forgot-password" className={styles.forgot}>
                Забыли пароль?
              </a>

              {formError && (
                <p className={styles.formError} role="alert">
                  {formError}
                </p>
              )}

              <Button type="submit" isLoading={isLoading} loadingText="Входим…">
                Войти
              </Button>
            </form>

            <p className={styles.switch}>
              Нет аккаунта? <a href="#/register">Зарегистрироваться</a>
            </p>
          </>
        )}
      </AuthCard>
    </PageLayout>
  )
}

export default LoginPage
