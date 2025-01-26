import { Status } from "@/services/api/types/status";
import { SortEnum } from "@/services/api/types/sort-type";
import { SKU } from "@/services/api/types/sku";

export type SkuFilterType = {
  status?: Status[];
};

export type SkuSortType = {
  orderBy: keyof SKU;
  order: SortEnum;
};
