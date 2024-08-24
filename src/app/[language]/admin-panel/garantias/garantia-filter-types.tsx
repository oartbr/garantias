import { Status } from "@/services/api/types/status";
import { SortEnum } from "@/services/api/types/sort-type";
import { Garantia } from "@/services/api/types/garantia";

export type GarantiaFilterType = {
  status?: Status[];
};

export type GarantiaSortType = {
  orderBy: keyof Garantia;
  order: SortEnum;
};
