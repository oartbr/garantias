export type PropsType = {
  params: { slug: string; id: string; language: string };
  searchParams?: { [key: string]: string | string[] | undefined };
  userId?: string | number | undefined;
};
