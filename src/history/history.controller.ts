import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetHistoryResponseData } from './dto/get-historys.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async recordHistory(@Body('song_id') song_id: number): Promise<void> {
    await this.historyService.recordHistory(song_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public getHistorys(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<GetHistoryResponseData> {
    return this.historyService.getHistorys(page, size);
  }
}
