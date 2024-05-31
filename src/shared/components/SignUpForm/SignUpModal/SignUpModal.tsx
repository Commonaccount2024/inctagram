import { Button, Modal, Typography } from '@commonaccount2024/inctagram-ui-kit'

import s from './SignUpModal.module.scss'

interface LogoutModalProps {
  email: string
  isOpen: boolean
  onClose: () => void
}

export const SignUpModal = ({ email, isOpen, onClose }: LogoutModalProps) => {
  return (
    <Modal onOpenChange={onClose} open={isOpen} title={'Email sent'}>
      <Typography className={s.text} variant={'regular-text-16'}>
        We have sent a link to confirm your email to {email}
      </Typography>
      <div className={s.buttonsDiv}>
        <Button onClick={onClose} variant={'primary'}>
          ok
        </Button>
      </div>
    </Modal>
  )
}
