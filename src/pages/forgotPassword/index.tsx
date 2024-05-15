import ForgotPasswordForm from '@/pages/forgotPassword/forgotPasswordForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function ForgotPassword() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.forgotPasswordPage.title} />
      <h1>{routerLocale.forgotPasswordPage.title}</h1>
      <ForgotPasswordForm />
    </>
  )
}
