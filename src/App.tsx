import { useHashRoute } from './hooks/useHashRoute'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

/*
  App решает, какую страницу показать, по адресу:
  /#/register → регистрация, всё остальное → вход.
  Новая страница (например, блог) = новый вариант в useHashRoute + строка здесь.
*/
function App() {
  const route = useHashRoute()

  if (route === 'register') return <RegisterPage />
  return <LoginPage />
}

export default App
