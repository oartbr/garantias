"use client";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
// import { useAuthLoginService } from "@/services/api/services/auth";
// import useAuthActions from "@/services/auth/use-auth-actions";
// import useAuthTokens from "@/services/auth/use-auth-tokens";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useGetListingByGarantiaIdService } from "@/services/api/garantia";
// import { useTranslation } from "@/services/i18n/client";
// import { useSnackbar } from "notistack";
// import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
import { ItemCard } from "../../../../components/itemCard/itemCard";
import { useTranslation } from "@/services/i18n/client";

type ItemCardProps = Garantia;

import React, { useEffect, useState } from "react";
import { Garantia } from "../../../../services/api/types/garantia";

type Props = {
  params: { language: string; id: string };
};

function List(props: Props) {
  // const { setUser } = useAuthActions();
  // const { setTokensInfo } = useAuthTokens();
  // const fetchAuthLogin = useAuthLoginService();
  // const { enqueueSnackbar } = useSnackbar();
  // const router = useRouter();
  const { t } = useTranslation("register");
  const garantiaId = props.params.id;

  const fetchListGarantias = useGetListingByGarantiaIdService();
  const [isLoading, setIsLoading] = useState({});
  const [items, setItems] = useState<ItemCardProps[]>([]);

  useEffect(() => {
    setIsLoading(true); // Indicate loading state
    fetchListGarantias({ garantiaId })
      .then((data) => {
        if (data.status === HTTP_CODES_ENUM.OK) {
          const fetchedData = data.data as unknown;
          setItems(fetchedData as ItemCardProps[]); // Step 3: Update state with fetched data
          setIsLoading(false); // Update loading state
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setIsLoading(false); // Update loading state
      });
  }, [garantiaId, fetchListGarantias]); // Include fetchListGarantias in the dependency array

  return (
    <Container maxWidth="sm" className="mainContainer">
      <Grid>
        <Grid>
          <h3>
            {t("register:workflow.confirm-phone.submit")} Tus productos con
            garantia:
          </h3>
        </Grid>
        <Grid container spacing={3} rowSpacing={3}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            items.map((item: ItemCardProps, index: number) => (
              <Grid item xs={12} key={index}>
                <ItemCard
                  item={item}
                  onClick={() => {
                    // console.log("Clicked on item:", item);
                  }}
                  action="Ver detalles"
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
