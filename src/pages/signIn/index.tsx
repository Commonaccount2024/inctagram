import LoginForm from '@/shared/components/LoginForm/LoginForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function SignIn() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.signInPage.title} />
      <LoginForm />
    </>
  )
}
