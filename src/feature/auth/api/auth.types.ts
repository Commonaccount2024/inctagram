export type LoginParams = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export type SendEmailRequestBody = {
  baseUrl: string
  email: string
  password: string
  userName: string
}

export const SIGNUP_FORM_FIELDS = ['baseUrl', 'email', 'password', 'userName', 'code'] as const
export const SIGNIN_FORM_FIELDS = ['email', 'password', 'userName'] as const
export type FormFieldError =
  | (typeof SIGNIN_FORM_FIELDS)[number]
  | (typeof SIGNUP_FORM_FIELDS)[number]

export type ErrorResponse = {
  error: string
  messages: { field: FormFieldError; message: string }[]
  statusCode: number
}

export type ConfirmEmailRequestBody = {
  confirmationCode: string
}

export type ResendEmailRequestBody = Pick<SendEmailRequestBody, 'baseUrl' | 'email'>
