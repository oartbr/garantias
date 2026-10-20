import type { Metadata } from "next";
import EditSku from "./page-content";
import { getServerTranslation } from "@/services/i18n";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";

type Props = {
  params: Promise<{
    language: string;
    slug: string;
    id: string;
    userId: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-sku-edit"
  );

  return {
    title: t("title"),
  };
}

//export default EditGarantia;
export default async function ListingPage(props: Props) {
  const resolvedProps = { ...props, params: await props.params };
  if (!IS_SIGN_UP_ENABLED) {
    //return redirect("/");
  }

  return <EditSku {...resolvedProps} />;
}
