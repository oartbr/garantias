"use client";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import useAuth from "@/services/auth/use-auth";
// import { useAuthLoginService } from "@/services/api/services/auth";
// import useAuthActions from "@/services/auth/use-auth-actions";
// import useAuthTokens from "@/services/auth/use-auth-tokens";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useGetListingNotasByUserService } from "@/services/api/services/notas";
// import { useTranslation } from "@/services/i18n/client";
// import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { ItemCard } from "../../../components/itemCard/itemCard";
import React, { useEffect, useState } from "react";
import { Nota } from "@/services/api/types/nota";

type Props = {
  params: { language: string };
};

type ItemCardProps = Nota;

function List(props: Props) {
  // const { setUser } = useAuthActions();
  // const { setTokensInfo } = useAuthTokens();
  // const fetchAuthLogin = useAuthLoginService();
  // const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  console.log(props);
  // const { t } = useTranslation("register");
  const { user } = useAuth();

  const fetchListNotas = useGetListingNotasByUserService();
  const [isLoading, setIsLoading] = useState({});
  const [items, setItems] = useState<ItemCardProps[]>([]);

  useEffect(() => {
    setIsLoading(true); // Indicate loading state
    if (user) {
      fetchListNotas({ userId: user.id.toString(), page: 1, limit: 10 })
        .then((data) => {
          if (data.status === HTTP_CODES_ENUM.OK) {
            setItems(data.data.results as ItemCardProps[]); // Step 3: Update state with fetched data
            setIsLoading(false); // Update loading state
          }
        })
        .catch((err) => {
          console.error(`Failed to fetch client data: ${user.id}`, err);
          setIsLoading(false); // Update loading state
        });
    }
  }, [user, fetchListNotas]); // Include 'fetchListGarantias' in the dependency array

  return (
    <Container maxWidth="sm" className="mainContainer">
      <Grid>
        <Grid>
          <h1>Notas Fiscais</h1>
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
                    router.replace(`${item.status}`);
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

export default withPageRequiredAuth(Listing);
