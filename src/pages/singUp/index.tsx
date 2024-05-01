import { useRouterLocaleDefination } from 'hooks/useRouterLocaleDefination'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'

export default function SingUp() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={'SingUp'} />
      <h1>{routerLocale.singUpPage.title}</h1>
    </>
  )
}
