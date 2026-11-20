import { useHashRoute } from './hooks/useHashRoute'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ProductPage from './pages/ProductPage/ProductPage'
import AboutTheCompany from './AboutTheCompany'

/*
  App решает, какую страницу показать, по адресу:
  /#/register → регистрация, /#/product → карточка товара,
  /#/about → о компании, всё остальное → вход.
  Новая страница (например, блог) = новый вариант в useHashRoute + строка здесь.
*/
function App() {
  const route = useHashRoute()

  if (route === 'register') return <RegisterPage />
  if (route === 'product') return <ProductPage />
  if (route === 'about') return <AboutTheCompany />
  return <LoginPage />
}

export default App