import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/application/store'
import { useLogoutMutation } from '@/feature/auth/api/authApi'
import { selectUserEmail } from '@/feature/auth/api/authSlice'
import { useRouter } from 'next/router'

import { LogoutModal } from '../LogoutModal/LogoutModal'
interface LogoutError {
  data?: {
    statusCode?: number
  }
}
export const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const router = useRouter()
  const email = useSelector((state: RootState) => selectUserEmail(state))
  const [logout, { isLoading }] = useLogoutMutation()

  const handleLogoutClick = () => {
    setIsModalOpen(true)
  }

  const handleConfirmLogout = async () => {
    try {
      await logout().unwrap()
      localStorage.removeItem('accessToken')
      router.push('/signIn')
    } catch (err) {
      const logoutError = err as LogoutError

      if (logoutError.data?.statusCode === 401) {
        setError('Session expired. Please sign in again.')
      } else {
        setError('Failed to log out. Please try again.')
      }
    } finally {
      setIsModalOpen(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <button disabled={isLoading} onClick={handleLogoutClick}>
        Log out
      </button>
      {error && <p>{error}</p>}
      <LogoutModal
        email={email || ''}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  )
}
