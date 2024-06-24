import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CodeGenerator from "../../../../../services/codeGenerator/generator";
import { db } from "../../../../../services/api/services/firestore/firestore";
import { collection, doc, setDoc } from "firebase/firestore";

const warrantyCodes = collection(db, "codeBank");

type Props = {
  params: { language: string; amount: string };
};

// Wrap the top-level await expression in an async function
async function setWarrantyCode(code: string) {
  await setDoc(doc(warrantyCodes, code), {
    code: code,
    brand: "WSE",
    owner: "",
    builtOn: "",
    product: "",
    soldTo: "",
  });
}

function generateCodes(amount: number): void {
  if (amount > 50 || amount < 1) {
    //to-do: generate error and fix
    amount = 1;
  }

  const newCode = new CodeGenerator(7);
  for (let i = 0; i < amount; i++) {
    newCode.new();
    console.log(newCode.code);
    setWarrantyCode(newCode.code);
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-generateCodes"
  );

  return {
    title: t("title"),
  };
}

export default async function Home({ params }: Props) {
  generateCodes(parseInt(params.amount));
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-generateCodes"
  );
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
          <Typography variant="h4" align="center">
            {params.amount + t("newCodesCreated")}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
