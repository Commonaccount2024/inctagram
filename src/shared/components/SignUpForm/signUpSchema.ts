import { object, string, z } from 'zod'

const signUpSchema = object({
  agreeToTerms: z.boolean({
    required_error: 'You must agreed with terms and policy',
  }),

  confirmPassword: string().min(1, 'Please confirm your password'),
  email: string()
    .min(1, "Email field can't be empty")
    .email('The email must match the format example@example.com'),
  password: string()
    .min(6, 'Minimum number of characters 6')
    .max(20, 'Maximum number of characters 20')
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[0-9A-Za-z!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
      `Password must contain 0-9, a-z, A-Z, ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _\` { | } ~`
    ),
  userName: string()
    .min(1, "Username field can't be empty")
    .min(6, 'Minimum number of characters 6')
    .max(30, 'Maximum number of characters 30')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      `Username must contain 0-9; A-Z; a-z; _ ; -
      `
    ),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})

export { signUpSchema }

export type SignUpFormFields = z.infer<typeof signUpSchema>
