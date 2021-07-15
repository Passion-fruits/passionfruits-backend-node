import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// 400
export const QueryBadRequest = new BadRequestException('Query Bad Request');
export const CommentExistException = new BadRequestException(
  'Comment Exist Exception',
);

// 401
export const UnauthorizedTokenException = new UnauthorizedException(
  'Unauthorized',
);
export const ExpiredTokenException = new UnauthorizedException('Token Expired');

// 404
export const NotFoundProfileException = new NotFoundException(
  'Profile Not Found',
);
export const NotFoundSongException = new NotFoundException('Song Not Found');
export const NotFoundCommentException = new NotFoundException(
  'Comment Not Found',
);
