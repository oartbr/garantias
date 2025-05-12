"use client";
// import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import useAuth from "@/services/auth/use-auth";
// import { useAuthLoginService } from "@/services/api/services/auth";
// import useAuthActions from "@/services/auth/use-auth-actions";
// import useAuthTokens from "@/services/auth/use-auth-tokens";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useGetGarantiaService } from "@/services/api/services/garantia";
import { useTranslation } from "@/services/i18n/client";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { ItemCard } from "@/components/itemCard/itemCard";
import React, { useEffect, useState } from "react";
import { Garantia } from "@/services/api/types/garantia";
import Button from "@mui/material/Button";
import { WorkflowService } from "@/services/workflows/workflowService";
import workflowGarantia from "@/services/workflows/workflowGarantia";
// import MediaCard from "@/components/itemCard/mediaCard";
import MediaLink from "@/components/mediaLink";

type Props = {
  params: { language: string; id: string };
};

function List(props: Props) {
  // const { setUser } = useAuthActions();
  // const { setTokensInfo } = useAuthTokens();
  // const fetchAuthLogin = useAuthLoginService();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { t } = useTranslation("listing");
  const { user } = useAuth();
  const garantiaId = props.params.id;
  console.log({ user });

  // const fetchListGarantias = useGetListingByUserService();
  const fetchGarantia = useGetGarantiaService();
  const [isLoading, setIsLoading] = useState({});
  const [item, setItem] = useState<Garantia | null>(null);

  useEffect(() => {
    setIsLoading(true); // Indicate loading state
    console.log({ user });
    fetchGarantia({ garantiaId: garantiaId, userId: user?.id })
      .then((data) => {
        if (data && data.status === HTTP_CODES_ENUM.OK) {
          setItem(data.data.garantia as Garantia); // Step 3: Update state with fetched data
          setIsLoading(false); // Update loading state
        } else {
          setItem(null);
          setIsLoading(false); // Update loading state
          enqueueSnackbar(`${t("listing:message.error")}`, {
            variant: "error",
          });
          console.error("Failed to fetch client data:", data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch client data:", err);
        setIsLoading(false); // Update loading state
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const workflowService = new WorkflowService(item, user, workflowGarantia);

  const workflowData = workflowService
    ? workflowService.getWorkflowData()
    : null;

  return (
    <Container maxWidth="sm" className="mainContainer">
      <Grid>
        <Grid>
          {!isLoading && item && (
            <div>
              <h3>{t("listing:message." + workflowData?.message)}</h3>
            </div>
          )}
        </Grid>
        <Grid container spacing={3} rowSpacing={3}>
          {isLoading && <p>Loading...</p>}
          {!isLoading && item && (
            <Grid item xs={12}>
              <ItemCard
                item={item}
                action={t(
                  "listing:actions." + (workflowData?.action || "Close")
                )}
                onClick={() => {
                  router.replace(`${workflowData?.route}`);
                }}
                user={user || undefined}
              />
            </Grid>
          )}
          {!isLoading && !item && !user && (
            <>
              <Grid item xs={12}>
                <h3>{t("listing:message." + workflowData?.message)}</h3>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  data-testid="resend-code/"
                  onClick={() => router.replace("sign-in")}
                >
                  {t("listing:actions.login")}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  data-testid="resend-code/"
                  onClick={() => router.replace("sign-up")}
                >
                  {t("listing:actions.createAccount")}
                </Button>
              </Grid>
            </>
          )}
          {!isLoading && !item && user && (
            <>
              <Grid item xs={12}>
                <h3>{t("listing:message." + workflowData?.message)}</h3>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  data-testid="resend-code/"
                  onClick={() => router.replace("/")}
                >
                  {t("listing:actions.return")}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MediaLink />
      </Grid>
      <Grid item sx={{ mx: "auto" }} className="privacyPolicy">
        <Button href="/privacy-policy">{t("privacy-policy")}</Button>
      </Grid>
    </Container>
  );
}

function Listing(props: Props) {
  return <List params={props.params} />;
}

export default Listing;
