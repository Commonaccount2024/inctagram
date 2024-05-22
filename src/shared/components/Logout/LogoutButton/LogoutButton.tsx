import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/application/store'
import { useLogoutMutation } from '@/feature/auth/api/authApi'
import { selectUserEmai } from '@/feature/auth/api/authSlice'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'

import { LogoutModal } from '../LogoutModal/LogoutModal'

export const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const router = useRouter()
  const email = useSelector((state: RootState) => selectUserEmai(state))
  const [logout, { isLoading }] = useLogoutMutation()

  const handleLogoutClick = () => {
    setIsModalOpen(true)
  }

  const handleConfirmLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      if (token) {
        const decodedToken: { exp: number } = jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000)

        if (decodedToken.exp < currentTime) {
          setError('Token is expired')

          return
        }
      } else {
        setError('No token found')

        return
      }
      await logout().unwrap()
      localStorage.removeItem('accessToken')
      router.push('/signIn')
    } catch (err) {
      setError('Failed to log out. Please try again.')
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
