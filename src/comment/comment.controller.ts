import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

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
}
