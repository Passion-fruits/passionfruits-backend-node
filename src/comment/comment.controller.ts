import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsBySongIdResponseData } from './dto/get-comments-by-song-id.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async createComment(
    @Body() dto: CreateCommentDto,
  ): Promise<{ message: string }> {
    await this.commentService.createComment(dto);
    return { message: 'success' };
  }

  @Get(':song_id')
  public async getCommentsBySongId(
    @Param('song_id') song_id: number,
  ): Promise<GetCommentsBySongIdResponseData[]> {
    return await this.commentService.getCommentsBySongId(song_id);
  }
}
