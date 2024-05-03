import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'

export default function SingUp() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={'SingUp'} />
      <h1>{routerLocale.singUpPage.title}</h1>
    </>
  )
}
