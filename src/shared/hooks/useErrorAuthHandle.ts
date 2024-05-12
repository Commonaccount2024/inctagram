type ErrorDataType = {
  statusCode: number
  messages: { message: string; field: string }[]
  error: string
  errorMessage: string
  field: string
}

export function useErrorAuthHandle(error: any) {
  let statusCode = 0
  let errorStr = 'Unknown error'
  let errorMessage = '';
  let field = '';

  if ('data' in error) {
    const errMsg = error.data as ErrorDataType
    if (errMsg.statusCode) {
      statusCode = errMsg.statusCode
    }
    if (errMsg.messages) {
      errorMessage = errMsg.messages[0].message
      field = errMsg.messages[0].field
    }
    if (errMsg.error) {
      errorStr = errMsg.error
    }
  }

  return {
    statusCode,
    errorMessage,
    field,
    error: errorStr,
  }
}
