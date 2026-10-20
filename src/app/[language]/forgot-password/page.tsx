import type { Metadata } from "next";
import ForgotPassword from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "forgot-password");

  return {
    title: t("title"),
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return (
    <ForgotPassword
      params={{ slug: "", id: "", ...params }}
      searchParams={searchParams}
    />
  );
}
