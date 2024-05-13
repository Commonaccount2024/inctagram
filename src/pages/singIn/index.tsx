import { Provider } from 'react-redux'

import LoginForm from '@/shared/components/LoginForm/LoginForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

import { store } from '../../app/store'

export default function SingIn() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <Provider store={store}>
        <HeadMeta title={routerLocale.singInPage.title} />
        <h1>{routerLocale.singInPage.title}</h1>
        <LoginForm />
      </Provider>
    </>
  )
}
