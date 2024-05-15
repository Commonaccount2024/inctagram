import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@commonaccount2024/inctagram-ui-kit'

type ControlledInputProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'onBlur' | 'onChange' | 'value'
> &
  UseControllerProps<T>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...restProps
}: ControlledInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextField error={error?.message} {...field} {...restProps} />
}
