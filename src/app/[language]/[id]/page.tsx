import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Trans } from "react-i18next/TransWithoutContext";
import tanque from "../../../../public/assets/images/tanque.svg";
import scan from "../../../../public/assets/images/scan.svg";
import Image from "next/image";
import Button from "@mui/material/Button";

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
  //console.log({ aqui: params.id });
  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={3}
        wrap="nowrap"
        pt={3}
        direction="column"
        sx={{ height: "90vh", justifyContent: "space-between" }}
      >
        <Grid item>
          <div className="scanning">
            <Image
              className="qrTanque"
              src={tanque.src}
              alt="tanque"
              fill={true}
            />
            <Image className="qrScan" src={scan.src} alt="scan" fill={true} />
          </div>
          <div className="dataCheck">
            <Typography variant="h4" data-testid="product-serial" gutterBottom>
              {params.id}
            </Typography>
            <Typography variant="h6" data-testid="product-sku" gutterBottom>
              {"WS-BIO1300"}
            </Typography>
            <Typography data-testid="product-name" gutterBottom>
              {"Biodigestor Autolimpiante 1300 litros"}
            </Typography>
            <MuiLink href={`/register/${params.id}`}>
              <Button variant="contained">Registrar Garantia</Button>
            </MuiLink>
          </div>
          <div className="welcomeMessage">
            <Typography variant="h3" data-testid="home-title" gutterBottom>
              {t("title")}
            </Typography>
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
        <Grid item sx={{ mx: "auto" }}>
          <MuiLink href="/privacy-policy">Privacy Policy</MuiLink>
        </Grid>
      </Grid>
    </Container>
  );
}
