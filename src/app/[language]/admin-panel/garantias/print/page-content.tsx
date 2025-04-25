"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PdfCard from "@/components/itemCard/pdfCard";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import useAuth from "@/services/auth/use-auth";
import { useEffect, useState } from "react";
// import { useSnackbar } from "notistack";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { useGetListingPdfsService } from "@/services/api/services/garantia";
// import { useRouter } from "next/navigation";

type Props = {
  params: { language: string; id: string };
};

type PdfCardProps = {
  status: string;
  url: string;
  params?: { language?: string; id?: string };
};

function ListPdfs(props: PdfCardProps) {
  // const { enqueueSnackbar } = useSnackbar();
  // const router = useRouter();

  const { t } = useTranslation("print");
  const { user } = useAuth();

  const fetchPrintGarantias = useGetListingPdfsService();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<PdfCardProps[]>([]);

  useEffect(() => {
    setIsLoading(true); // Indicate loading state
    if (user) {
      fetchPrintGarantias({ status: props.status || "completed" })
        .then((data) => {
          if (data.status === HTTP_CODES_ENUM.OK) {
            setItems(data.data as PdfCardProps[]); // Update state with fetched data
          }
          setIsLoading(false); // Update loading state
        })
        .catch((err) => {
          console.error(`Failed to fetch pending files list.`, err);
          setIsLoading(false); // Update loading state
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPrintGarantias]);

  return (
    <Container maxWidth="sm" className="mainContainer">
      <Grid>
        <Grid>{!isLoading ? <h3>{t("print:title")}</h3> : <h3></h3>}</Grid>
        <Grid container spacing={3} rowSpacing={3}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {items.length === 0 ? (
                <p style={{ textAlign: "center" }}>{t("print:noFiles")}</p>
              ) : (
                items.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <PdfCard
                      item={item}
                      onClick={() => {
                        window.open(item.url, "_blank");
                      }}
                      action="Ver detalles"
                    />
                  </Grid>
                ))
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

function PrintGarantia(props: Props) {
  return (
    <>
      <ListPdfs params={props.params} status={""} url={""} />
    </>
  );
}

export default withPageRequiredAuth(PrintGarantia);
