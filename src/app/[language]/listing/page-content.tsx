"use client";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
// import { useAuthLoginService } from "@/services/api/services/auth";
// import useAuthActions from "@/services/auth/use-auth-actions";
// import useAuthTokens from "@/services/auth/use-auth-tokens";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useGetListingByGarantiaIdService } from "@/services/api/services/garantia";
// import { useTranslation } from "@/services/i18n/client";
// import { useSnackbar } from "notistack";
// import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { ItemCard } from "../../../components/itemCard/itemCard";
import React, { useEffect, useState } from "react";

type Props = {
  params: { language: string; id: string };
};

function List(props: Props) {
  // const { setUser } = useAuthActions();
  // const { setTokensInfo } = useAuthTokens();
  // const fetchAuthLogin = useAuthLoginService();
  // const { enqueueSnackbar } = useSnackbar();
  // const router = useRouter();
  // const { t } = useTranslation("register");
  const garantiaId = props.params.id;

  const fetchListGarantias = useGetListingByGarantiaIdService();
  const [isLoading, setIsLoading] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    setIsLoading(true); // Indicate loading state
    fetchListGarantias({ garantiaId })
      .then((data) => {
        if (data.status === HTTP_CODES_ENUM.OK) {
          setItems(data.data); // Step 3: Update state with fetched data
          setIsLoading(false); // Update loading state
        }
      })
      .catch((err) => {
        console.error("Failed to fetch client data:", err);
        setIsLoading(false); // Update loading state
      });
  }, [garantiaId, fetchListGarantias]); // Include 'fetchListGarantias' in the dependency array

  return (
    <Container maxWidth="sm" className="mainContainer">
      <Grid>
        <Grid>
          <h3>Tus productos con garantia:</h3>
        </Grid>
        <Grid container spacing={3} rowSpacing={3}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            items.map((item, index) => (
              <Grid item xs={12} key={index}>
                <ItemCard
                  item={item}
                  onClick={() => {
                    console.log("Clicked on item:", item);
                  }}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

function Listing(props: Props) {
  return <List params={props.params} />;
}

export default withPageRequiredGuest(Listing);
