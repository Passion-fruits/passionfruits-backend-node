import { EntityRepository, Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { GetCommentsBySongIdResponseData } from '../dto/get-comments-by-song-id.dto';
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
      content: dto.content,
    });
    await this.save(newComment);
  }

  public getCommentsBySongId(
    song_id: number,
  ): Promise<GetCommentsBySongIdResponseData[]> {
    return this.createQueryBuilder('comment')
      .innerJoin('comment.user_id', 'user')
      .innerJoin('user.profile', 'profile')
      .select('user.id', 'user_id')
      .addSelect('comment.created_at', 'created_at')
      .addSelect('profile.name', 'name')
      .addSelect('profile.image_path', 'profile')
      .addSelect('comment.content')
      .where('comment.song_id = :song_id', { song_id })
      .orderBy('comment.created_at', 'DESC')
      .getRawMany();
  }
}
