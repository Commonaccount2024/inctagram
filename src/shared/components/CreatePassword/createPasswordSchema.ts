import { object, string, z } from 'zod'

export const newPasswordSchema = object({
  newPassword: string()
    .min(6, 'Minimum number of characters 6')
    .max(20, 'Maximum number of characters 20')
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[0-9A-ZaZ!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
      `Password must contain 0-9, a-z, A-Z, and special characters`
    ),
  passwordConfirmation: string().min(1, "Password confirmation can't be empty"),
}).refine(data => data.newPassword === data.passwordConfirmation, {
  message: 'The passwords must match',
  path: ['passwordConfirmation'],
})

export type NewPasswordSchemaParams = z.infer<typeof newPasswordSchema>
