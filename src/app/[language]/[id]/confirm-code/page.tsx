import type { Metadata } from "next";
import ConfirmCode from "../../confirm-code/page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: { language: string; id: string; confirmStatus: confirmStatus };
};

interface confirmStatus {
  confirmed: boolean;
  message: string;
  code: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "register");
  return {
    title: t("title") + params.language + params.id,
  };
}

export default function ConfirmCodePage(props: Props) {
  return <ConfirmCode {...props} />;
}
