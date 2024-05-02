import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'

export default function SingIn() {
  const routerLocale = useRouterLocaleDefination()
  return (
    <>
      <HeadMeta title={'SingIn'} />
      <h1>{routerLocale.singInPage.title}</h1>
    </>
  )
}
