import { NotFoundException, UnauthorizedException } from '@nestjs/common';

// 401
export const UnauthorizedTokenException = new UnauthorizedException();
export const ExpiredTokenException = new UnauthorizedException('Token Expired');

// 404
export const NotFoundProfileException = new NotFoundException(
  'Profile Not Found',
);
