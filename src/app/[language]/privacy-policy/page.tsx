import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "privacy-policy");

  return {
    title: t("title"),
  };
}

async function PrivacyPolicy({ params }: Props) {
  const { t } = await getServerTranslation(params.language, "privacy-policy");

  return (
    <Container maxWidth="md" sx={{ py: 8 }} className="privacy-policy">
      <Typography
        variant="h2"
        component="h1"
        data-testid="privacy-policy-title"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        {t("title")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("lastUpdated") + " " + new Date("04/29/2025").toLocaleDateString()}
      </Typography>
      <Typography
        data-testid="privacy-policy-description"
        gutterBottom
        paragraph
      >
        {t("intro")}
      </Typography>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          letterSpacing="-0.02em"
          gutterBottom
        >
          {t("legalBasis.title")}
        </Typography>
        <ul>
          {(t("legalBasis.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography paragraph>{item}</Typography>
              </li>
            )
          )}
        </ul>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          letterSpacing="-0.02em"
          gutterBottom
        >
          {t("dataCollected.title")}
        </Typography>
        <ul>
          {(t("dataCollected.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography paragraph>{item}</Typography>
              </li>
            )
          )}
        </ul>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          letterSpacing="-0.02em"
          gutterBottom
        >
          {t("purpose.title")}
        </Typography>
        <ul>
          {(t("purpose.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography paragraph>{item}</Typography>
              </li>
            )
          )}
        </ul>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          letterSpacing="-0.02em"
          gutterBottom
        >
          {t("dataRetention.title")}
        </Typography>
        <Typography paragraph>{t("dataRetention.description")}</Typography>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          letterSpacing="-0.02em"
          gutterBottom
        >
          {t("userRights.title")}
        </Typography>
        <ul>
          {(t("userRights.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography paragraph>{item}</Typography>
              </li>
            )
          )}
        </ul>
        <Typography paragraph>{t("userRights.contact")}</Typography>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          letterSpacing="-0.02em"
          gutterBottom
        >
          {t("dataTransfer.title")}
        </Typography>
        <Typography paragraph>{t("dataTransfer.description")}</Typography>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          letterSpacing="-0.02em"
          gutterBottom
        >
          {t("security.title")}
        </Typography>
        <ul>
          {(t("security.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography paragraph>{item}</Typography>
              </li>
            )
          )}
        </ul>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          letterSpacing="-0.02em"
          gutterBottom
        >
          {t("policyChanges.title")}
        </Typography>
        <Typography paragraph>{t("policyChanges.description")}</Typography>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          letterSpacing="-0.02em"
          gutterBottom
        >
          {t("contact.title")}
        </Typography>
        <Typography paragraph>{t("contact.email")}</Typography>
        <Typography paragraph>{t("contact.phone")}</Typography>
      </Box>
    </Container>
  );
}
export default PrivacyPolicy;
