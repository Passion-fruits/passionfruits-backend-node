import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/config/logger/logger.service';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const logger = new LoggerService();
    const context = host.switchToHttp();
    const request: Request = context.getRequest();
    const response: Response = context.getResponse();
    const status: number = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR)
      logger.error(exception.message, exception.stack);
    const errorResponse = {
      code: status,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message
          : 'Interal server error',
    };
    logger.error(
      `${new Date().toISOString()} ${request.method} ${
        request.url
      } ${status} ${JSON.stringify(errorResponse)}`,
      '',
    );
    response.status(status).json(errorResponse);
  }
}
