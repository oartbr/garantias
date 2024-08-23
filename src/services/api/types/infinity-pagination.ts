export type InfinityPaginationType<T> = {
  results: unknown;
  hasNextPage: boolean;
  data: T[];
};
