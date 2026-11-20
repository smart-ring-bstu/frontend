import { useState } from 'react'
import Logo from '../Logo/Logo'
import styles from './Header.module.css'

// Страниц пока нет — ссылки-заглушки, ведут на вход (см. useHashRoute)
const NAV_LINKS = [
  { label: 'Каталог', href: '#/catalog' },
  { label: 'Приложение', href: '#/app' },
  { label: 'Блог', href: '#/blog' },
  { label: 'О компании', href: '#/about' },
]

interface HeaderProps {
  cartCount?: number // TODO: брать из корзины, когда она появится
}

/*
  Верхняя панель сайта. Как она меняется по ширине (по макету):
  ≥1024px — логотип, меню, «Войти», «Корзина»
  <1024px — меню прячется, появляется кнопка-бургер
  <600px  — «Войти» тоже уезжает в бургер
*/
function Header({ cartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a href="#/" className={styles.brand} aria-label="AURING — на главную">
          <Logo />
          <span>AURING</span>
        </a>

        <nav className={styles.nav} aria-label="Основное меню">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#/login" className={`${styles.pill} ${styles.pillOutline} ${styles.loginButton}`}>
            Войти
          </a>
          <a href="#/cart" className={`${styles.pill} ${styles.pillAccent}`}>
            Корзина{cartCount > 0 && ` (${cartCount})`}
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Макет бургера («Бургер для телефона и планшета») ещё не смотрели — пока простой список */}
      {isMenuOpen && (
        <nav id="mobile-menu" className={`container ${styles.mobileMenu}`} aria-label="Меню">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#/login" className={styles.mobileLogin} onClick={closeMenu}>
            Войти
          </a>
        </nav>
      )}
    </div>
  )
}

export default Header
