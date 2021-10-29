import { ApiResponse } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { client } from 'src/config/elasticsearch';

@Injectable()
export class SearchService {
  public songAutocomplete(
    q: string,
    size: number,
  ): Promise<ApiResponse<Record<string, any>, unknown>> {
    return client.search({
      index: 'song_idx',
      body: {
        query: {
          match_phrase_prefix: {
            title_ngram: q,
          },
        },
        highlight: {
          fields: {
            title_ngram: {},
          },
        },
        _source: 'title',
      },
      size,
    });
  }

  public playlistAutocomplete(
    q: string,
    size: number,
  ): Promise<ApiResponse<Record<string, any>, unknown>> {
    return client.search({
      index: 'playlist_idx',
      body: {
        query: {
          match_phrase_prefix: {
            name_ngram: q,
          },
        },
        highlight: {
          fields: {
            name_ngram: {},
          },
        },
        _source: 'name',
      },
      size,
    });
  }

  public profileAutocomplete(
    q: string,
    size: number,
  ): Promise<ApiResponse<Record<string, any>, unknown>> {
    return client.search({
      index: 'profile_idx',
      body: {
        query: {
          match_phrase_prefix: {
            name_ngram: q,
          },
        },
        highlight: {
          fields: {
            name_ngram: {},
          },
        },
        _source: 'name',
      },
      size,
    });
  }
}
