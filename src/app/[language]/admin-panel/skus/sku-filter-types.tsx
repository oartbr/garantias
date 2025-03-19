//import { Category } from "@/services/api/types/category";
import { SortEnum } from "@/services/api/types/sort-type";
import { SKU } from "@/services/api/types/sku";

export type SkuFilterType = {
  category?: string[];
};

export type SkuSortType = {
  orderBy: keyof SKU;
  order: SortEnum;
};
