export enum CategoryEnum {
  autoclean = "Autolimpiables",
  reinforced = "Reforzados Horizontales",
  DDB = "DDB Horizontales",
}

export type Category = {
  id: number | string;
  name?: string;
};
