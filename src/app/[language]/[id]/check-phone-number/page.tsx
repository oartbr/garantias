import type { Metadata } from "next";
import CheckPhoneNumber from "../../check-phone-number/page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: Promise<{ language: string; id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "common");
  return {
    title: t("common:checkPhoneNumber"),
  };
}

export default async function CheckPhoneNumberPage(props: Props) {
  const resolvedProps = { ...props, params: await props.params };
  return <CheckPhoneNumber {...resolvedProps} />;
}
