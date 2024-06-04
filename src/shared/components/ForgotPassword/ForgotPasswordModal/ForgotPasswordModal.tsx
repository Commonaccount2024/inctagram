import { Button, Modal, Typography } from '@commonaccount2024/inctagram-ui-kit'

import s from './ForgotPasswordModal.module.scss'

type Props = {
  email: string
  handleModal: () => void
  isOpen: boolean
  title: string
}

export const ForgotPasswordModal = ({ email, handleModal, isOpen, title }: Props) => {
  return (
    <Modal onOpenChange={handleModal} open={isOpen} title={title}>
      <div className={s.wrapper}>
        <Typography className={s.text} variant={'regular-text-16'}>
          {`We have sent a link to confirm your email to ${email}`}
        </Typography>
        <div className={s.buttonWrapper}>
          <Button
            className={s.button}
            onClick={handleModal}
            title={'Close'}
            type={'button'}
            variant={'primary'}
          >
            <Typography variant={'h3'}>OK</Typography>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
