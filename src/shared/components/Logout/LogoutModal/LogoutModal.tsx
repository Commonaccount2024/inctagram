interface LogoutModalProps {
  email: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const LogoutModal = ({ email, isOpen, onClose, onConfirm }: LogoutModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div>
      <div>
        <p>Are you really want to log out of your account {email}?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  )
}
