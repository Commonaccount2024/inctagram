import { OAuth } from '@/features/oAuth/oAuth'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function SingUp() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.singUpPage.title} />
      <h1>{routerLocale.singUpPage.title}</h1>
      <OAuth />
    </>
  )
}
