import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { Button } from '@commonaccount2024/inctagram-ui-kit'

export default function Home() {
  const routerLocale = useRouterLocaleDefination()

  return (
    <>
      <HeadMeta title={routerLocale.title} />
      <h1 style={{ marginBottom: 30 }}>{routerLocale.test}</h1>
      <Button>Hello</Button>
    </>
  )
}
