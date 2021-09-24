import { IsNumber } from 'class-validator';

export class DeleteSongInPlaylistDto {
  @IsNumber()
  song_id: number;
}
