import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { UserCommentSongRepository } from './entity/user-comment-song.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserCommentSongRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
