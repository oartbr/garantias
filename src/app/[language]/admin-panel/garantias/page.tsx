import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Garantias from "./page-content";

type Props = {
  params: { slug: string; id: string; language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-garantias"
  );

  return {
    title: t("title"),
  };
}

export default Garantias;
