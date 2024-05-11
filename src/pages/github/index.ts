import { useEffect } from 'react'

import { useRouter } from 'next/router'

export default function GithubPage() {
  const router = useRouter()

  const { accessToken, email } = router.query

  useEffect(() => {
    if (accessToken && email) {
      localStorage.setItem('accessToken', accessToken as string)

      console.log('accessToken saved')
      router.push(`/`)

      return
    } else {
      router.push(`/singIn`)
    }
  }, [accessToken])
}
