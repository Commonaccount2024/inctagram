import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { NewPasswordParams } from '@/feature/auth/api/auth.types'
import { useCreatePasswordMutation } from '@/feature/auth/api/authApi'
import {
  NewPasswordSchemaParams,
  newPasswordSchema,
} from '@/shared/components/CreatePassword/createPasswordSchema'
import { ControlledTextField } from '@/shared/components/controlled/controlledTextField/controlledTextField'
import { Button, Card, Typography } from '@commonaccount2024/inctagram-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import s from './CreatePassword.module.scss'

export default function CreatePassword() {
  const [createPassword] = useCreatePasswordMutation()

  const [codeRecovery, setCodeRecovery] = useState('')
  const router = useRouter()

  const queryCode = router.query.code as string

  useEffect(() => {
    if (queryCode) {
      setCodeRecovery(queryCode)
    }
  }, [queryCode])

  const { control, handleSubmit, reset } = useForm<NewPasswordSchemaParams>({
    defaultValues: {
      newPassword: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(newPasswordSchema),
  })

  const onSubmit: SubmitHandler<NewPasswordParams> = async data => {
    if (!data) {
      toast.error('Data is undefined')
    } else {
      data.recoveryCode = codeRecovery
    }
    try {
      await createPassword(data).unwrap()
      reset()
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/signIn`)
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    }
  }

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Create New Password
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          className={s.textFieldSmall}
          control={control}
          label={'New password'}
          name={'newPassword'}
          placeholder={'Enter password'}
          type={'password'}
        />
        <ControlledTextField
          className={s.textFieldLarge}
          control={control}
          label={'Password confirmation'}
          name={'passwordConfirmation'}
          placeholder={'Enter password confirmation'}
          type={'password'}
        />
        <Typography className={s.instruction} variant={'regular-text-14'}>
          Your password must be between 6 and 20 characters
        </Typography>
        <Button className={s.submitButton} fullWidth type={'submit'}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
