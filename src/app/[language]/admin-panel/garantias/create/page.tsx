import type { Metadata } from "next";
import CreateGarantias from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ language: string; amount: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-garantia-create"
  );

  return {
    title: t("title"),
  };
}

export default function Page() {
  return <CreateGarantias />;
}
