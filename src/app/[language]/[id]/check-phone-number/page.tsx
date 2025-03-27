import type { Metadata } from "next";
import CheckPhoneNumber from "../../check-phone-number/page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: { language: string; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "common");
  return {
    title: t("common:checkPhoneNumber"),
  };
}

export default function CheckPhoneNumberPage(props: Props) {
  return <CheckPhoneNumber {...props} />;
}
