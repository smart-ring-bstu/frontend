import { useEffect, useState } from 'react'

/*
  ВРЕМЕННЫЙ мини-роутер на адресах вида  /#/login,  /#/register.
  Часть адреса после # браузер не отправляет на сервер, поэтому это работает
  и в dev-режиме, и на стенде (nginx), без настройки сервера.

  Когда команда согласует react-router — заменим этот хук, страницы трогать не придётся.
*/

export type Route = 'login' | 'register'

function parseHash(hash: string): Route {
  if (hash === '#/register') return 'register'
  return 'login' // пока других страниц нет — всё остальное ведёт на вход
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))

  useEffect(() => {
    function handleHashChange() {
      setRoute(parseHash(window.location.hash))
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handleHashChange)
    // «Уборка»: когда компонент исчезает, снимаем подписку
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}
