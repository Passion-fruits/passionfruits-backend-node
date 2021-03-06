import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CommentExistException,
  NotFoundCommentException,
} from 'src/shared/exception/exception.index';
import { IUserReqeust } from 'src/shared/interface/request.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsBySongIdResponseData } from './dto/get-comments-by-song-id.dto';
import { UserCommentSongRepository } from './entity/user-comment-song.repository';

@Injectable({ scope: Scope.REQUEST })
export class CommentService {
  constructor(
    @InjectRepository(UserCommentSongRepository)
    private readonly commentRepository: UserCommentSongRepository,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  public async createComment(dto: CreateCommentDto): Promise<void> {
    const commentRecord = await this.commentRepository.findOne({
      user_id: this.request.user.sub,
      song_id: dto.song_id,
    });
    if (commentRecord) throw CommentExistException;
    return this.commentRepository.createComment(dto, this.request.user.sub);
  }

  public async getCommentsBySongId(
    song_id: number,
  ): Promise<GetCommentsBySongIdResponseData[]> {
    const commentRecord = await this.commentRepository.getCommentsBySongId(
      song_id,
    );
    if (commentRecord.length === 0) throw NotFoundCommentException;
    return commentRecord;
  }
}
