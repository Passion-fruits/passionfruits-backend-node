import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { ExpiredTokenException } from '../../../shared/exception/exception.index';
import { UnauthorizedTokenException } from '../../exception/exception.index';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      throw ExpiredTokenException;
    } else if (err) {
      throw UnauthorizedTokenException;
    }
    return user;
  }
}
