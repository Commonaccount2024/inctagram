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

export type ErrorResponse = {
  error: string
  messages: { field: string; message: string }[]
  statusCode: number
}

export type SendVerificationCode = {
  confirmationCode: string
}

export type ResendEmailRequestBody = Pick<SendEmailRequestBody, 'baseUrl' | 'email'>
