import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res = exception.getResponse()
      if (typeof res === 'string') {
        message = res
      } else if (res && typeof res === 'object' && 'message' in res) {
        const msg = (res as { message?: string | string[] }).message
        if (Array.isArray(msg)) {
          message = msg.join(', ')
        } else if (msg) {
          message = msg
        } else {
          message = exception.message
        }
      } else {
        message = exception.message
      }
    } else if (exception instanceof Error) {
      message = exception.message
    }

    response.status(status).json({
      success: false,
      message,
      statusCode: status,
    })
  }
}
