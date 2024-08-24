import { useGetGarantiasService } from "@/services/api/services/garantia";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GarantiaFilterType, GarantiaSortType } from "../garantia-filter-types";

export const garantiasQueryKeys = createQueryKeys(["garantias"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: GarantiaFilterType | undefined;
        sort?: GarantiaSortType | undefined;
      }) => ({
        key: [sort, filter],
      }),
    },
  }),
});

export const useGarantiaListQuery = ({
  sort,
  filter,
}: {
  filter?: GarantiaFilterType | undefined;
  sort?: GarantiaSortType | undefined;
} = {}) => {
  const fetch = useGetGarantiasService();

  const query = useInfiniteQuery({
    queryKey: garantiasQueryKeys.list().sub.by({ sort, filter }).key,
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
