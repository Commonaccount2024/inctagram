import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { NewPasswordParams } from '@/feature/auth/api/auth.types'
import { useCreatePasswordMutation } from '@/feature/auth/api/authApi'
import { ControlledTextField } from '@/shared/components/controlled/controlledTextField/controlledTextField'
import { Button } from '@commonaccount2024/inctagram-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './createPassword.module.scss'

export default function CreatePassword() {
  const [createPassword] = useCreatePasswordMutation()

  const [_, setCode] = useState('')
  const router = useRouter()

  const queryCode = router.query.code as string

  useEffect(() => {
    if (queryCode) {
      setCode(queryCode)
    }
  }, [queryCode])

  const { control, handleSubmit } = useForm<NewPasswordParams>({
    defaultValues: {
      newPassword: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit: SubmitHandler<NewPasswordParams> = data => {
    createPassword(data)
      .unwrap()
      .then()
      .catch(e => {
        toast.error(e.error)
      })
  }

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          label={'Password'}
          name={'newPassword'}
          placeholder={'Enter Password'}
          type={'password'}
        />
        <ControlledTextField
          control={control}
          label={'Password Confirmation'}
          name={'passwordConfirmation'}
          placeholder={'Enter Password Confirmation'}
          type={'password'}
        />
        <Link className={s.linkButton} href={'/signIn'}>
          <Button fullWidth type={'submit'}>
            {'Create Password'}
          </Button>
        </Link>
      </form>
    </div>
  )
}
