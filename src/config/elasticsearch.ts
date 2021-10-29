import { Client } from '@elastic/elasticsearch';

export const client = new Client({
  node: process.env.ELASTICSEARCH_HOST,
});
