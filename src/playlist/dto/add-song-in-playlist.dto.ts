import { IsNumber } from 'class-validator';

export class AddSongInPlaylistDto {
  @IsNumber()
  song_id: number;
}
