import { useGetSKUsService } from "@/services/api/services/sku";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SkuFilterType, SkuSortType } from "../sku-filter-types";

export const skusQueryKeys = createQueryKeys(["skus"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: SkuFilterType | undefined;
        sort?: SkuSortType | undefined;
      }) => ({
        key: [sort, filter],
      }),
    },
  }),
});

export const useSkuListQuery = ({
  sort,
  filter,
}: {
  filter?: SkuFilterType | undefined;
  sort?: SkuSortType | undefined;
} = {}) => {
  const fetch = useGetSKUsService();

  const query = useInfiniteQuery({
    queryKey: skusQueryKeys.list().sub.by({ sort, filter }).key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
          filters: filter,
          sort: sort ? [sort] : undefined,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES_ENUM.OK) {
        //console.log({ fetch: data.results });
        return {
          data: data.results,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
    gcTime: 0,
  });

  return query;
};
