export enum StatusEnum {
  created = "created",
  assigned = "assigned",
  registered = "registered",
  canceled = "canceled",
}

export type Status = {
  id: number | string;
  name?: string;
};
