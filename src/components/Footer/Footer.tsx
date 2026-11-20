import styles from './Footer.module.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>© {year} AURING</span>
        <nav className={styles.links} aria-label="Документы">
          <a href="#/privacy">Политика конфиденциальности</a>
          <span aria-hidden="true">·</span>
          <a href="#/returns">Условия возврата</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
