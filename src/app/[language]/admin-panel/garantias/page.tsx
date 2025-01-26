import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Garantias from "./page-content";
import { PropsType } from "@/services/api/types/propsType";

export async function generateMetadata({
  params,
}: PropsType): Promise<Metadata> {
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-garantias"
  );

  return {
    title: t("title"),
  };
}

export default Garantias;
