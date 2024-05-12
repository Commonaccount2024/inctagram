import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@commonaccount2024/inctagram-ui-kit'

type ControlledInputProps<T extends FieldValues> = { className?: string } & Omit<
  CheckboxProps,
  'checked' | 'className' | 'id' | 'onCheckedChange'
> &
  UseControllerProps<T>

export const ControlledCheckbox = <T extends FieldValues>({
  className,
  control,
  name,
  ...restProps
}: ControlledInputProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  })

  return (
    <Checkbox {...restProps} checked={value} className={className} onCheckedChange={onChange} />
  )
}
