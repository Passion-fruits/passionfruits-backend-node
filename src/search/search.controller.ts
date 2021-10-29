import { ApiResponse } from '@elastic/elasticsearch';
import { Controller, Get, Query } from '@nestjs/common';
import { client } from 'src/config/elasticsearch';
import { AutocompleteResponseData } from './dto/autocomplete.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('auto')
  public async autocomplete(
    @Query('q') query: string,
    @Query('size') size: number,
  ): Promise<AutocompleteResponseData> {
    const songRes = await this.searchService.songAutocomplete(query, size);
    const playlistRes = await this.searchService.playlistAutocomplete(
      query,
      size,
    );
    const profileRes = await this.searchService.profileAutocomplete(
      query,
      size,
    );

    return {
      song: songRes.body.hits.hits.map((record) => {
        return mapFunc(record);
      }),
      playlist: playlistRes.body.hits.hits.map((record) => {
        return mapFunc(record);
      }),
      profile: profileRes.body.hits.hits.map((record) => {
        return mapFunc(record);
      }),
    };

    function mapFunc(record: any) {
      return {
        id: record._id,
        source: record._source,
        highlight: record.highlight,
      };
    }
  }
}
