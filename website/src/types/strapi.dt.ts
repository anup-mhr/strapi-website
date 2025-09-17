export interface IQueryOptions {
  filters?: Record<string, any>;
  fields?: string[];
  populate?: string | string[] | Record<string, any>;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

export interface IOptions {
  cache?: RequestCache;
  revalidate?: number;
}
