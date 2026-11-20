import { useHashRoute } from './hooks/useHashRoute'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ProductPage from './pages/ProductPage/ProductPage'

/*
  App решает, какую страницу показать, по адресу:
  /#/register → регистрация, /#/product → карточка товара, всё остальное → вход.
  Новая страница (например, блог) = новый вариант в useHashRoute + строка здесь.
*/
function App() {
  const route = useHashRoute()

  if (route === 'register') return <RegisterPage />
  if (route === 'product') return <ProductPage />
  return <LoginPage />
}

export default App
