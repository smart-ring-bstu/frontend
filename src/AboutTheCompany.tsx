
import { useState, type FormEvent } from "react";
import logo from "./assets/logo.jpg";
import "./AboutTheCompany.css";

function AboutTheCompany() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="about-page">
      <header className="about-header">
        <div className="about-container">
          <nav className="navigation">
            <a href="/" className="logo">
                <img src={logo} alt="AURING" className="logo-image" />
                <span>AURING</span>
            </a>

            <div className="navigation-links">
              <a href="/catalog">Каталог</a>
              <a href="/app">Приложение</a>
              <a href="/blog">Блог</a>
              <a href="/about" className="active-link">
                О компании
              </a>
            </div>

            <div className="navigation-actions">
              <a href="/login" className="login-button">
                Войти
              </a>
              <a href="/cart" className="cart-button">
                Корзина (1)
              </a>
            </div>
          </nav>

          <div className="header-title">
            <h1>О компании</h1>
            <p>Кто мы, как с нами связаться и где нас найти.</p>
          </div>
        </div>
      </header>

      <main className="about-main">
        <div className="about-container">

          <section className="about-intro">
            <div className="intro-heading">
              <h2>
                Мы делаем кольцо,
                <br />
                которым
                <br />
                пользуются
                <br />
                каждый день
              </h2>
            </div>

            <div className="intro-description">
              <p>
                AURING — команда дизайнеров и инженеров.
                Мы собрали оплату, связь, пульс и зарядку
                в тонкое кольцо, которое не нужно снимать.
              </p>
            </div>
          </section>

          <section className="about-contacts">

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="contact-name">Имя</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Как к вам обращаться"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">
                  Электронная почта
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="name@mail.ru"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">Сообщение</label>
                <textarea
                  id="contact-message"
                  placeholder="Чем мы можем помочь?"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                Отправить сообщение
              </button>

              {isSent && (
                <p className="success-message" role="status">
                  Спасибо! Ваше сообщение подготовлено.
                </p>
              )}
            </form>

            <div className="contact-information">
              <div className="contact-item">
                <h3>Поддержка</h3>
                <a href="mailto:supportauring@mail.ru">
                  supportauring@mail.ru
                </a>
                <p>Ежедневно с 9:00 до 21:00</p>
              </div>

              <div className="contact-item">
                <h3>Сотрудничество</h3>
                <a href="mailto:auring@mail.ru">
                  auring@mail.ru
                </a>
              </div>

              <div className="contact-item">
                <h3>Офис</h3>
                <p>Москва, ул. Пушкина, 1</p>
              </div>
            </div>
          </section>

          <section className="office-map">
            <div className="map-grid">
              <div className="map-green-area" />

              <div className="map-card">
                <h3>AURING, офис</h3>
                <p>Москва, ул. Пушкина, 1</p>
                <a
                  href="https://yandex.ru/maps/?text=Москва%2C%20ул.%20Пушкина%2C%201"
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть в Яндекс Картах
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      <footer className="about-footer">
        <div className="about-container footer-content">
          <p>© 2026 AURING</p>

          <div className="footer-links">
            <a href="/privacy">
              Политика конфиденциальности
            </a>
            <span>·</span>
            <a href="/returns">Условия возврата</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutTheCompany;