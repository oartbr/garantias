import type { Metadata } from "next";
import Listing from "./page-content";
import { getServerTranslation } from "@/services/i18n";
import { redirect } from "next/navigation";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";

type Props = {
  params: { language: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "listing");

  return {
    title: t("title"),
  };
}

export default function ListingPage(props: Props) {
  if (!IS_SIGN_UP_ENABLED) {
    return redirect("/");
  }

  return <Listing {...props} />;
}
