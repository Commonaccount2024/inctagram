import { RegistrationForm } from '@/shared/components/SignUpForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function SignUp() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.signUpPage.title} />
      <RegistrationForm />
    </>
  )
}
