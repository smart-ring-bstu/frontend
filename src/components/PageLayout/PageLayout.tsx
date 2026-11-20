import type { ReactNode } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './PageLayout.module.css'

/*
  Каркас страницы, общий для всего сайта:
  мятная шапка (меню + большой заголовок) → контент → подвал.
  children — то, что мы кладём «внутрь» компонента между <PageLayout>...</PageLayout>.
*/
interface PageLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <Header />
        <div className={`container ${styles.heroText}`}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </header>

      <main className={`container ${styles.main}`}>{children}</main>

      <Footer />
    </div>
  )
}

export default PageLayout
