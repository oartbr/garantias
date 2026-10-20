import Stack from "@mui/material/Stack";
import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Trans } from "react-i18next/TransWithoutContext";
import tanque from "../../../public/assets/images/tanque.svg";
import scan from "../../../public/assets/images/scan.svg";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
//import MediaLink from "../../components/mediaLink";
import MediaCard from "../../components/itemCard/mediaCard";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default async function Home(props: Props) {
  const params = await props.params;
  const listing_t = await getServerTranslation(params.language, "listing");
  const tMedia = listing_t.t;
  const { t } = await getServerTranslation(params.language, "home");

  return (
    <Container maxWidth="sm">
      <Stack
        spacing={3}
        direction="column"
        sx={{
          pt: 3,
          height: "90vh",
          justifyContent: "space-between",
        }}
      >
        <Grid>
          <Box
            component="div"
            className="scan"
            sx={{
              ml: 1,
            }}
          >
            <div className="scanning">
              <Image
                className="qrTanque"
                src={tanque.src}
                alt="tanque"
                fill={true}
              />
              <Image className="qrScan" src={scan.src} alt="scan" fill={true} />
            </div>
          </Box>
          <div className="mensagem">
            <Button
              variant="contained"
              LinkComponent={Link}
              href="/scan"
              data-testid="scan-qr"
              className="scanButton"
            >
              {t("scan")}
            </Button>
            <Typography>
              <Trans
                i18nKey={`description`}
                t={t}
                components={[
                  <MuiLink
                    key="1"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/brocoders/extensive-react-boilerplate/blob/main/docs/README.md"
                  >
                    {}
                  </MuiLink>,
                ]}
              />
            </Typography>
          </div>
        </Grid>
        <Grid size={12}>
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            className="mediaLinks"
            sx={{
              alignItems: "center",
            }}
          >
            <Grid>
              <MediaCard
                title={tMedia("listing:manual.installation.title")}
                description={tMedia("listing:manual.installation.description")}
                action={tMedia("listing:manual.installation.action")}
                url="https://www.youtube.com/watch?v=l3OrBS2WSog"
                target="_blank"
              />
            </Grid>
            <Grid>
              <MediaCard
                title={tMedia("listing:manual.functionalities.title")}
                description={tMedia(
                  "listing:manual.functionalities.description"
                )}
                action={tMedia("listing:manual.functionalities.action")}
                url="https://www.youtube.com/watch?v=ZlX54y61RJc"
                target="_blank"
              />
            </Grid>
            <Grid>
              <MediaCard
                title={tMedia("listing:manual.maintenance.title")}
                description={tMedia("listing:manual.maintenance.description")}
                action={tMedia("listing:manual.maintenance.action")}
                url="https://www.youtube.com/watch?v=e9-PfyDAh7w"
                target="_blank"
              />
            </Grid>
          </Stack>
        </Grid>
        <Grid sx={{ mx: "auto" }} className="privacyPolicy">
          <Button href="/privacy-policy">{t("privacy-policy")}</Button>
        </Grid>
      </Stack>
    </Container>
  );
}
