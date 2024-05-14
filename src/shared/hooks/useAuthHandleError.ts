type ErrorDataType = {
  error: string
  errorMessage: string
  field: string
  messages: { field: string; message: string }[]
  statusCode: number
}

export function useAuthHandleError() {
  return (error: any) => {
    let statusCode = 0
    let errorStr = 'Unknown error'
    let errorMessage = ''
    let field = ''

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
      error: errorStr,
      errorMessage,
      field,
      statusCode,
    }
  }
}
