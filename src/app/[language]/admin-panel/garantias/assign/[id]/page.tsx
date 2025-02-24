import type { Metadata } from "next";
import EditGarantia from "./page-content";
import { getServerTranslation } from "@/services/i18n";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";

type Props = {
  params: { language: string; slug: string; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-garantias-edit"
  );

  return {
    title: t("title1"),
  };
}

//export default EditGarantia;
export default function ListingPage(props: Props) {
  if (!IS_SIGN_UP_ENABLED) {
    //return redirect("/");
  }

  return <EditGarantia searchParams={{}} {...props} />;
}
