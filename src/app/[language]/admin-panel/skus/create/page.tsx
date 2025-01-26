import type { Metadata } from "next";
import CreateSKU from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: { language: string; amount: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-sku-create"
  );

  return {
    title: t("title"),
  };
}

export default CreateSKU;
