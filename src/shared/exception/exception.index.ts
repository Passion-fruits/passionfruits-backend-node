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
export const PlaylistHasSongExistException = new BadRequestException(
  'Playlist Already Have Song',
);
export const AlreadyPaymentedException = new BadRequestException(
  'Already Paymented',
);
export const InsufficientBalanceException = new BadRequestException(
  'Insufficient Balance Exception',
);
export const SameNonceTxPoolException = new BadRequestException(
  'Same Nonce Tx Pool Exception',
);
export const S3GetObjectException = new BadRequestException(
  'S3 Get Object Exception',
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
export const NotFoundPlaylistException = new NotFoundException(
  'Playlist Not Found',
);
export const NotFoundPlaylistHasSongException = new NotFoundException(
  'Playlist Has Song Not Found',
);
export const NotFoundKdtHistoryException = new NotFoundException(
  'Kdt History Not Found',
);
