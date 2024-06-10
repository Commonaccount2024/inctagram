import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email field can't be empty")
    .email('The email must match the format example@example.com'),
  password: z
    .string()
    .min(6, 'Minimum number of characters 6')
    .max(20, 'Maximum number of characters 20')
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[0-9A-Za-z!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
      `Password must contain 0-9, a-z, A-Z, ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _\` { | } ~`
    ),
})

export { loginSchema }
export type LoginFormFields = z.infer<typeof loginSchema>
