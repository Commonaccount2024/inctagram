import { ErrorResponse, SendEmailRequestBody } from '@/feature/auth/api/auth.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type SignUpFormError = Record<keyof SendEmailRequestBody, string>

export function apiErrorsAdapter(error?: FetchBaseQueryError) {
  const res = {} as SignUpFormError

  if (error && error?.data && isErrorResponse(error.data)) {
    for (const err of error.data.messages) {
      res[err.field as keyof SendEmailRequestBody] = err.message
    }
  }

  return res
}

export function isErrorResponse(obj: any): obj is ErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.error === 'string' &&
    Array.isArray(obj.messages) &&
    obj.messages.every(
      (message: any) =>
        typeof message === 'object' &&
        message !== null &&
        typeof message.field === 'string' &&
        typeof message.message === 'string'
    ) &&
    typeof obj.statusCode === 'number'
  )
}

export function isSignUpFormError(obj: any): obj is SignUpFormError {
  const keys: (keyof SendEmailRequestBody)[] = ['baseUrl', 'email', 'password', 'userName']

  return typeof obj === 'object' && obj !== null && keys.some(key => typeof obj[key] === 'string')
}
