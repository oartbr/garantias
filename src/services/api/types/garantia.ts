export interface OptionItem {
  id: string;
  label: string;
}

export type Garantia = {
  description?: string;
  sku?: string;
  garantiaId: string; // Required in Mongoose
  status: string; // Required in Mongoose, consider adding an enum
  brand?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  number?: string;
  city?: string;
  zipcode?: string;
  registeredAt: string; // Assuming API returns ISO string
  builtAt?: string; // Corrected from `builtOn`, assuming ISO string
  qualityCheckedAt?: string; // Assuming ISO string
  reseller?: string;
  shippedAt?: string; // Changed from `shippedDate`, assuming ISO string
  soldTo?: string;
  userId?: string; // Could be ObjectId as string from MongoDB
  qualityCheck?: OptionItem[]; // Verify if API returns this structure
  printedAt?: string; // Assuming ISO string
  qualityResponsible?: string;
  phoneNumber?: string; // Added from Mongoose schema
  url?: string; // Added from Mongoose schema
  assignedAt?: string; // Added from Mongoose schema, assuming ISO string
};
