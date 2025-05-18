import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import NotaDetails from "./page-content";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "nota");

  return {
    title: t("title"),
  };
}

export default NotaDetails;
