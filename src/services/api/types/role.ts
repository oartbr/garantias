export enum RoleEnum {
  ADMIN = 1,
  USER = 2,
  QA = 3,
  CARRIER = 4,
  SALES = 5,
  MAINTENANCE = 6,
}

export type Role = {
  id: number | string;
  name?: string;
};
