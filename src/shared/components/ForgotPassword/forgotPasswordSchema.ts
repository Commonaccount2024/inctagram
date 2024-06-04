import { object, string, z } from 'zod'

export const forgotPasswordSchema = object({
  email: string().min(1, "Email field can't be empty").email("User with this email doesn't exist"),
  recaptcha: z
    .string()
    .optional()
    .refine(data => data !== undefined && data !== null, {
      message: 'Recaptcha is required',
    }),
})

export type ForgotPasswordSchemaParams = z.infer<typeof forgotPasswordSchema>
