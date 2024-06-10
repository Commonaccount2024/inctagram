import { Button, Modal, Typography } from '@commonaccount2024/inctagram-ui-kit'

import s from './LogoutModal.module.scss'
interface LogoutModalProps {
  email: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const LogoutModal = ({ email, isOpen, onClose, onConfirm }: LogoutModalProps) => {
  return (
    <Modal onOpenChange={onClose} open={isOpen} title={'Log Out'}>
      <Typography className={s.text} variant={'regular-text-16'}>
        Are you really want to log out of your account ?
        <span style={{ fontWeight: 700 }}>{email}</span>?
      </Typography>

      <div className={s.buttonsDiv}>
        <Button onClick={onConfirm} variant={'outline'}>
          Yes
        </Button>
        <Button onClick={onClose}>No</Button>
      </div>
    </Modal>
  )
}
