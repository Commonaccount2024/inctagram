import LoginForm from '@/shared/components/LoginForm/LoginForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function SingIn() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.singInPage.title} />
      <h1>{routerLocale.singInPage.title}</h1>
      <LoginForm />
    </>
  )
}
