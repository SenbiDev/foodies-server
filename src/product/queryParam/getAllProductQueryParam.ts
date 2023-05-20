export interface GetAllProductQueryParam {
  q: string;
  limit: number;
  page: number;
  category: string;
  tags: [string];
}
