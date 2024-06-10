import { useEffect } from 'react'

import { useRouter } from 'next/router'

export default function GithubPage() {
  const router = useRouter()

  const { accessToken, email } = router.query

  useEffect(() => {
    if (accessToken && email) {
      localStorage.setItem('accessToken', accessToken as string)

      router.push(`/`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])
}
