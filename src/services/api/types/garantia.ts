export interface OptionItem {
  id: string;
  label: string;
}

export type Garantia = {
  description?: string;
  sku?: string;
  garantiaId: string;
  status?: string;
  brand?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  number?: string;
  city?: string;
  zipcode?: string;
  registeredAt: string;
  builtOn?: string;
  qualityCheckedAt?: string;
  reseller?: string;
  shippedDate?: string;
  soldTo?: string;
  soldDate?: string;
  userId?: string;
  qualityCheck?: OptionItem[];
};
