import {
  ErrorResponse,
  FormErrorField,
  SIGNIN_FORM_FIELDS,
  SIGNUP_FORM_FIELDS,
  SendEmailRequestBody,
} from '@/feature/auth/api/auth.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type FormError = Record<FormErrorField, string>

export function formFieldsErrorAdapter(error?: FetchBaseQueryError) {
  const res = {} as FormError

  if (error && error?.data && isErrorResponse(error.data)) {
    for (const err of error.data.messages) {
      res[err.field as keyof SendEmailRequestBody] = err.message
    }
  }

  return res
}

export function isErrorResponse(obj: unknown): obj is ErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'error' in obj &&
    typeof obj.error === 'string' &&
    'messages' in obj &&
    'statusCode' in obj &&
    typeof obj.statusCode === 'number' &&
    Array.isArray(obj.messages) &&
    obj.messages.every(
      (message: unknown) =>
        typeof message === 'object' &&
        message !== null &&
        'field' in message &&
        typeof message.field === 'string' &&
        'message' in message &&
        typeof message.message === 'string'
    )
  )
}

export function isFormError(obj: any): obj is FormError {
  const keys = [...SIGNUP_FORM_FIELDS, ...SIGNIN_FORM_FIELDS]

  return typeof obj === 'object' && obj !== null && keys.some(key => typeof obj[key] === 'string')
}
