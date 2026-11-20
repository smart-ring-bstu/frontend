import type { ReactNode } from 'react'
import styles from './AuthCard.module.css'

/** Светлая карточка с формой — одинаковая для входа и регистрации */
interface AuthCardProps {
  title: string
  subtitle: string
  children: ReactNode
}

function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      {children}
    </section>
  )
}

export default AuthCard
