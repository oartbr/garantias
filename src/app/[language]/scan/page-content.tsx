"use client";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import QRscanner from "@/components/QRscanner/QRscanner";
//import { useEffect } from "react";
//import { Garantia } from "@/services/api/types/garantia";
import { useGetGarantiaService } from "@/services/api/services/garantia";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/services/auth/use-auth";

function checkScannedData(url: string, checkGarantia: (id: string) => void) {
  const aUrl = url.split("/");
  if (
    aUrl[2] === "garantias.xpand.international" ||
    aUrl[2] === "localhost:3000"
  ) {
    const garantiaId = aUrl[3];
    if (garantiaId.length === 10) {
      checkGarantia(garantiaId);
    }
  }
}

function Scan() {
  const { t } = useTranslation("scan");
  const [garantiaStatus, setGarantiaStatus] = useState<string | null>(null);
  const getGarantia = useGetGarantiaService();

  const router = useRouter();
  const { user } = useAuth();

  const checkGarantia = async (garantiaId: string) => {
    try {
      const { status, data } = await getGarantia({
        garantiaId,
        userId: user?.id, // Add null check for user object
      });

      const garantia = data?.garantia || "";

      if (status === 200 && garantia) {
        setGarantiaStatus(garantia.status);

        if (user && user.role.name === "ADMIN") {
          router.push(`./${garantia.garantiaId}`);
        } else {
          // Handle non-admin user logic here
          console.log("User is not admin");
        }
        // Decide next steps based on garantia status
        if (garantia.status === "active") {
          console.log("Garantia is active");
          // Add your logic for active garantia
        } else {
          console.log("Garantia is not active");
          // Add your logic for non-active garantia
        }
      } else {
        console.log("Garantia does not exist");
      }
    } catch (error) {
      console.error("Error fetching garantia:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item xs={12} style={{ width: "100%" }}>
          <QRscanner callBack={(url) => checkScannedData(url, checkGarantia)} />
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {t("title")}
          </Typography>
          <Typography>
            {t("description")}
            {garantiaStatus}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Scan;
