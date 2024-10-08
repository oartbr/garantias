"use client";
// import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import useAuth from "@/services/auth/use-auth";
// import { useAuthLoginService } from "@/services/api/services/auth";
// import useAuthActions from "@/services/auth/use-auth-actions";
// import useAuthTokens from "@/services/auth/use-auth-tokens";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useGetGarantiaService } from "@/services/api/services/garantia";
// import { useTranslation } from "@/services/i18n/client";
// import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { ItemCard } from "../../../components/itemCard/itemCard";
import React, { useEffect, useState } from "react";
import { Garantia } from "../../../services/api/types/garantia";

type Props = {
  params: { language: string; id: string };
};

function List(props: Props) {
  // const { setUser } = useAuthActions();
  // const { setTokensInfo } = useAuthTokens();
  // const fetchAuthLogin = useAuthLoginService();
  // const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  // const { t } = useTranslation("register");
  const { user } = useAuth();
  const garantiaId = props.params.id;

  // const fetchListGarantias = useGetListingByUserService();
  const fetchGarantia = useGetGarantiaService();
  const [isLoading, setIsLoading] = useState({});
  const [item, setItem] = useState<Garantia | null>(null);
  // console.log({ user, item });
  useEffect(() => {
    setIsLoading(true); // Indicate loading state
    fetchGarantia({ garantiaId: garantiaId, userId: user?.id.toString() })
      .then((data) => {
        if (data && data.status === HTTP_CODES_ENUM.OK) {
          setItem(data.data.garantia as Garantia); // Step 3: Update state with fetched data
          setIsLoading(false); // Update loading state
        } else {
          //setItem(null);
          setIsLoading(false); // Update loading state
          // console.error("Failed to fetch client data:", err);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch client data:", err);
        setIsLoading(false); // Update loading state
      });
  }, [user, fetchGarantia, garantiaId]);

  return (
    <Container maxWidth="sm" className="mainContainer">
      <Grid>
        <Grid>
          <h3></h3>
          {!isLoading && item && item.status === "assigned" && (
            <h3>Desea registrar la garantia de este producto?</h3>
          )}
          {!isLoading && item && item.status === "registered" && (
            <h3>Garantia {item.garantiaId} registrada en su cuenta: </h3>
          )}
        </Grid>
        <Grid container spacing={3} rowSpacing={3}>
          {isLoading && <p>Loading...</p>}
          {!isLoading && item && (
            <Grid item xs={12}>
              <ItemCard
                item={item}
                onClick={() => {
                  router.replace(`${garantiaId}/register`);
                }}
              />
            </Grid>
          )}
          {!isLoading && !item && (
            <h3>La garantía no fue identificada o ya fue registrada.</h3>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

function Listing(props: Props) {
  return <List params={props.params} />;
}

export default Listing;
