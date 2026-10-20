import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Scan from "./page-content";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "scan");

  return {
    title: t("title"),
  };
}

export default function Page() {
  return <Scan />;
}
