import type { Metadata } from "next";
import ConfirmCode from "../../confirm-code/page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: Promise<{
    language: string;
    id: string;
    confirmStatus: confirmStatus;
  }>;
};

interface confirmStatus {
  confirmed: boolean;
  message: string;
  code: string;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "register");
  return {
    title: t("title") + params.language + params.id,
  };
}

export default async function ConfirmCodePage(props: Props) {
  const resolvedProps = { ...props, params: await props.params };
  return <ConfirmCode {...resolvedProps} />;
}
