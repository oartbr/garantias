import type { Metadata } from "next";
import ConfirmCode from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ language: string; id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "register");
  return {
    title: t("workflow.get-code.title"),
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  return <ConfirmCode params={params} />;
}
