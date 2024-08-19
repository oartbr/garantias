"use client";
// import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import useAuth from "@/services/auth/use-auth";
// import { useAuthLoginService } from "@/services/api/services/auth";
// import useAuthActions from "@/services/auth/use-auth-actions";
// import useAuthTokens from "@/services/auth/use-auth-tokens";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import {
  useGetGarantiaService,
  useGetListingByUserService,
} from "@/services/api/services/garantia";
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

  const fetchListGarantias = useGetListingByUserService();
  const fetchGarantia = useGetGarantiaService();
  const [isLoading, setIsLoading] = useState({});
  const [item, setItems] = useState<Garantia>({} as Garantia);

  useEffect(() => {
    setIsLoading(true); // Indicate loading state
    if (user) {
      fetchGarantia({ garantiaId: garantiaId })
        .then((data) => {
          if (data.status === HTTP_CODES_ENUM.OK) {
            console.log({ data });
            setItems(data.data.garantia as Garantia); // Step 3: Update state with fetched data
            setIsLoading(false); // Update loading state
          }
        })
        .catch((err) => {
          console.error("Failed to fetch client data:", err);
          setIsLoading(false); // Update loading state
        });
    } else {
      fetchGarantia({ garantiaId: garantiaId })
        .then((data) => {
          if (data.status === HTTP_CODES_ENUM.OK) {
            //router.replace(`${garantiaId}/check-phone-number`); // if user is not logged in, redirect to check-phone-number
            setIsLoading(false); // Update loading state
          }
        })
        .catch((err) => {
          console.error("Failed to fetch client data:", err);
          setIsLoading(false); // Update loading state
        });
      setIsLoading(false); // Update loading state
    }
  }, [user, fetchListGarantias, fetchGarantia, garantiaId, router]); // Include 'fetchListGarantias' in the dependency array

  return (
    <Container maxWidth="sm" className="mainContainer">
      <Grid>
        <Grid>
          {isLoading ? (
            <h3>Cargando...</h3>
          ) : (
            <h3>Desea registrar la garantia de este producto?</h3>
          )}
        </Grid>
        <Grid container spacing={3} rowSpacing={3}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Grid item xs={12}>
              <ItemCard
                item={item}
                onClick={() => {
                  router.replace(`${garantiaId}/register`);
                }}
              />
            </Grid>
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
