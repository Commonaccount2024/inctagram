import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function SingIn() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={'SingIn'} />
      <h1>{routerLocale.singInPage.title}</h1>
    </>
  )
}
