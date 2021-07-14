import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// 400
export const QueryBadRequest = new BadRequestException();

// 401
export const UnauthorizedTokenException = new UnauthorizedException();
export const ExpiredTokenException = new UnauthorizedException('Token Expired');

// 404
export const NotFoundProfileException = new NotFoundException(
  'Profile Not Found',
);
export const NotFoundSongException = new NotFoundException('Song Not Found');
