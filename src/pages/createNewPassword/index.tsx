import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'

export default function CreateNewPassword() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.createNewPasswordPage.title} />
      <h1>{routerLocale.createNewPasswordPage.title}</h1>
    </>
  )
}
