import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Trans } from "react-i18next/TransWithoutContext";
import tanque from "../../../public/assets/images/nf.png";
import scan from "../../../public/assets/images/scan.svg";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default async function Home({ params }: Props) {
  const { t } = await getServerTranslation(params.language, "home");

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
        pt={3}
        direction="row" // Change to row for side-by-side layout
        sx={{ minHeight: "90vh", alignItems: "center" }} // Center vertically
      >
        {/* Left Column: Text and CTA */}
        <Grid item xs={12} md={6}>
          <div className="mensagem">
            <Typography variant="h4" gutterBottom>
              {t("title")}{" "}
              {/* "Transforme seus recibos em listas inteligentes com o Mamut" */}
            </Typography>
            <Typography variant="body1" paragraph>
              <Trans
                i18nKey="description"
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
              {/* "Escaneie recibos, acompanhe suas compras..." */}
            </Typography>
            <Button
              variant="contained"
              LinkComponent={Link}
              href="/sign-up"
              data-testid="sign-up"
              className="joinButton"
              sx={{ mb: 2 }}
            >
              {t("callToAction")} {/* "Cadastre-se e entre para o clube" */}
            </Button>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {t("socialProof")}{" "}
              {/* "Economize tempo e dinheiro como milhares de gaúchos já fazem!" */}
            </Typography>
          </div>
        </Grid>

        {/* Right Column: Scanning Animation */}
        <Grid item xs={12} md={6}>
          <Box
            component="div"
            className="scan"
            sx={{ position: "relative", height: "400px" }}
          >
            <div className="scanning">
              <Image
                className="qrTanque"
                src={tanque.src}
                alt="tanque"
                fill={true}
                style={{ objectFit: "contain" }}
              />
              <Image
                className="qrScan"
                src={scan.src}
                alt="scan"
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
          </Box>
        </Grid>

        {/* Footer: Privacy Policy Link */}
        <Grid item xs={12} sx={{ textAlign: "center", mt: "auto" }}>
          <MuiLink href="/privacy-policy">{t("privacy-policy")}</MuiLink>
        </Grid>
      </Grid>
    </Container>
  );
}
