import type { Metadata } from "next";
import EditGarantia from "./page-content";
import { getServerTranslation } from "@/services/i18n";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";

type Props = {
  params: Promise<{ language: string; slug: string; id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-garantias-check"
  );

  return {
    title: t("title1"),
  };
}

//export default EditGarantia;
export default async function ListingPage(props: Props) {
  const resolvedProps = { ...props, params: await props.params };
  if (!IS_SIGN_UP_ENABLED) {
    //return redirect("/");
  }

  return <EditGarantia searchParams={{}} {...resolvedProps} />;
}
