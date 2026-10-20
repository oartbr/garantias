import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "privacy-policy");

  return {
    title: t("title"),
  };
}

async function PrivacyPolicy(props: Props) {
  const params = await props.params;
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
      <Typography
        gutterBottom
        sx={{
          mb: 2,
        }}
      >
        {t("lastUpdated") + " " + new Date("04/29/2025").toLocaleDateString()}
      </Typography>
      <Typography
        data-testid="privacy-policy-description"
        gutterBottom
        sx={{
          mb: 2,
        }}
      >
        {t("intro")}
      </Typography>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          gutterBottom
          sx={{
            letterSpacing: "-0.02em",
          }}
        >
          {t("legalBasis.title")}
        </Typography>
        <ul>
          {(t("legalBasis.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography
                  sx={{
                    mb: 2,
                  }}
                >
                  {item}
                </Typography>
              </li>
            )
          )}
        </ul>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          gutterBottom
          sx={{
            letterSpacing: "-0.02em",
          }}
        >
          {t("dataCollected.title")}
        </Typography>
        <ul>
          {(t("dataCollected.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography
                  sx={{
                    mb: 2,
                  }}
                >
                  {item}
                </Typography>
              </li>
            )
          )}
        </ul>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          gutterBottom
          sx={{
            letterSpacing: "-0.02em",
          }}
        >
          {t("purpose.title")}
        </Typography>
        <ul>
          {(t("purpose.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography
                  sx={{
                    mb: 2,
                  }}
                >
                  {item}
                </Typography>
              </li>
            )
          )}
        </ul>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          gutterBottom
          sx={{
            letterSpacing: "-0.02em",
          }}
        >
          {t("dataRetention.title")}
        </Typography>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          {t("dataRetention.description")}
        </Typography>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          gutterBottom
          sx={{
            letterSpacing: "-0.02em",
          }}
        >
          {t("userRights.title")}
        </Typography>
        <ul>
          {(t("userRights.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography
                  sx={{
                    mb: 2,
                  }}
                >
                  {item}
                </Typography>
              </li>
            )
          )}
        </ul>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          {t("userRights.contact")}
        </Typography>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          gutterBottom
          sx={{
            letterSpacing: "-0.02em",
          }}
        >
          {t("dataTransfer.title")}
        </Typography>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          {t("dataTransfer.description")}
        </Typography>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          gutterBottom
          sx={{
            letterSpacing: "-0.02em",
          }}
        >
          {t("security.title")}
        </Typography>
        <ul>
          {(t("security.items", { returnObjects: true }) as string[]).map(
            (item: string, index: number) => (
              <li key={index}>
                <Typography
                  sx={{
                    mb: 2,
                  }}
                >
                  {item}
                </Typography>
              </li>
            )
          )}
        </ul>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          gutterBottom
          sx={{
            letterSpacing: "-0.02em",
          }}
        >
          {t("policyChanges.title")}
        </Typography>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          {t("policyChanges.description")}
        </Typography>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          component="h2"
          variant="h3"
          gutterBottom
          sx={{
            letterSpacing: "-0.02em",
          }}
        >
          {t("contact.title")}
        </Typography>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          {t("contact.email")}
        </Typography>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          {t("contact.phone")}
        </Typography>
      </Box>
    </Container>
  );
}
export default PrivacyPolicy;
