import type { Metadata } from "next";
import CheckPhoneNumber from "../../check-phone-number/page-content-OLD";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: { language: string; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "register");
  return {
    title: t("title") + params.language + params.id,
  };
}

export default function CheckPhoneNumberPage(props: Props) {
  return <CheckPhoneNumber {...props} />;
}
