export interface QueryDTO {
  query: string;
  limit: number;
  page: number;
  category: string;
  tags: [string];
}
