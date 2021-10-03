import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: Function) {
    const loggerService = new LoggerService();
    const tempUrl = req.method + ' ' + req.url.split('?')[0];
    const _query = JSON.stringify(req.query ? req.query : {});
    const _body = JSON.stringify(req.body ? req.body : {});
    const _url = JSON.stringify(tempUrl ? tempUrl : {});

    loggerService.log(
      `${req.ip} ${_url} ${_query} ${_body} ${
        req.headers['authorization'].split(' ')[1]
      } `,
    );
    next();
  }
}
