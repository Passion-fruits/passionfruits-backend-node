import { LoggerService as LS } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment';

const { printf, combine } = winston.format;

export class LoggerService implements LS {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: printf(
        (info) => `[${info.level.toUpperCase()}] - ${info.message}`,
      ),
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: `error-${moment(new Date()).format('YYYY-MM-DD')}.log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
        new winston.transports.Console({
          level: 'debug',
          format: combine(nestWinstonModuleUtilities.format.nestLike()),
        }),
        new winston.transports.File({
          level: 'info',
          filename: `application-${moment(new Date()).format(
            'YYYY-MM-DD',
          )}.log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }
  warn(message: string) {
    this.logger.warning(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
