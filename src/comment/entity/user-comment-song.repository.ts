import { EntityRepository, Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UserCommentSong } from './user-comment-song.entity';

@EntityRepository(UserCommentSong)
export class UserCommentSongRepository extends Repository<UserCommentSong> {
  public async createComment(
    dto: CreateCommentDto,
    user_id: number,
  ): Promise<void> {
    let newComment: UserCommentSong;
    newComment = this.create({
      user_id,
      song_id: dto.song_id,
      comment: dto.comment,
    });
    await this.save(newComment);
  }
}
