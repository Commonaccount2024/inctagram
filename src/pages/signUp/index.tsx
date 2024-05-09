import { RegistrationForm } from '@/shared/components/SignUpForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function SingUp() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.singUpPage.title} />
      <RegistrationForm />
    </>
  )
}
