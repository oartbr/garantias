import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Scan from "./page-content";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "scan");

  return {
    title: t("title"),
  };
}

export default Scan;
