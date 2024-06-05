import CreatePassword from '@/shared/components/CreatePassword/CreatePassword'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function CreateNewPassword() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.createNewPasswordPage.title} />
      <CreatePassword />
    </>
  )
}
