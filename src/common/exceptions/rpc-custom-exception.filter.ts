import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import type { Response } from 'express';

// type guard: valida que el objeto tenga status y message
function hasStatusAndMessage(
  val: unknown,
): val is { status: number | string; message: unknown } {
  return typeof val === 'object' && val !== null && 'status' in val && 'message' in val;
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const err = (typeof exception.getError === 'function'
      ? exception.getError()
      : (exception as any)) as unknown;

    let status = HttpStatus.BAD_REQUEST;
    let message: unknown = 'Bad Request';

    if (hasStatusAndMessage(err)) {
      // parsea status de forma segura (string o number)
      const parsed = Number(err.status);
      status = Number.isFinite(parsed) ? parsed : HttpStatus.BAD_REQUEST;
      message = err.message;
    } else if (typeof err === 'string') {
      message = err;
    } else if (typeof err === 'object' && err) {
      // intenta extraer message si existe
      message = (err as any).message ?? err;
    }

    return res.status(status).json({ status, message });
  }
}