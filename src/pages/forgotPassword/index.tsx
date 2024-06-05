import ForgotPasswordForm from '@/shared/components/ForgotPassword/ForgotPasswordForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function ForgotPassword() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.forgotPasswordPage.title} />
      <ForgotPasswordForm />
    </>
  )
}
