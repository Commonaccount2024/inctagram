import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function PasswordRecovery() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.passwordRecoveryPage.title} />
      <h1>{routerLocale.passwordRecoveryPage.title}</h1>
    </>
  )
}
