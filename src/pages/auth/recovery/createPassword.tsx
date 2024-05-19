import { SubmitHandler, useForm } from 'react-hook-form'

import { NewPasswordParams } from '@/feature/auth/api/auth.types'
import { useCreatePasswordMutation } from '@/feature/auth/api/authApi'
import { ControlledTextField } from '@/shared/components/controlled/controlledTextField/controlledTextField'
import { Button } from '@commonaccount2024/inctagram-ui-kit'
import Link from 'next/link'

import s from './createPassword.module.scss'

export default function CreatePassword() {
  const [createPassword] = useCreatePasswordMutation()

  const { control, handleSubmit } = useForm<NewPasswordParams>({
    defaultValues: {
      newPassword: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit: SubmitHandler<NewPasswordParams> = data => {
    createPassword(data)
      .unwrap()
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log('error', e)
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
