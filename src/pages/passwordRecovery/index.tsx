import { useRouterLocaleDefination } from 'hooks/useRouterLocaleDefination'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'

export default function PasswordRecovery() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={'PasswordRecovery'} />
      <h1>{routerLocale.passwordRecoveryPage.title}</h1>
    </>
  )
}
