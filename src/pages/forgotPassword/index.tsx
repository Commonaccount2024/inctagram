import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'

export default function ForgotPassword() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={'ForgetPassword'} />
      <h1>{routerLocale.forgotPasswordPage.title}</h1>
    </>
  )
}
