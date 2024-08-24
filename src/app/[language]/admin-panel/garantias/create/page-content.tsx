"use client";

import Button from "@mui/material/Button";
import { useForm, FormProvider, useFormState, Resolver } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import Link from "@/components/link";
import useLeavePage from "@/services/leave-page/use-leave-page";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { CreateGarantiasService } from "@/services/api/services/garantia";
import { useRouter } from "next/navigation";
// import { Role } from "@/services/api/types/role";
import FormSelectInput from "@/components/form/select/form-select";
//import withPageRequiredGuest from "@/services/auth/with-page-required-guest";

interface GenerateCodesFormData {
  quantity: OptionType;
}

type OptionType = {
  id: number;
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-users-create");

  return yup.object().shape({
    quantity: yup.object({
      id: yup
        .number()
        .required(
          t("admin-panel-users-create:inputs.role.validation.required")
        ),
    }),
  });
};

function GenerateCodesFormActions() {
  const { t } = useTranslation("admin-panel-users-create");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      {t("admin-panel-garantia-create:actions.create")}
    </Button>
  );
}

function FormCreateGarantias() {
  const router = useRouter();
  const fetchCreateCodes = CreateGarantiasService();
  const { t } = useTranslation("admin-panel-garantia-create");
  const validationSchema = useValidationSchema();

  const { enqueueSnackbar } = useSnackbar();

  const resolver: Resolver<GenerateCodesFormData> =
    yupResolver(validationSchema);

  const methods = useForm<GenerateCodesFormData>({
    resolver,
    defaultValues: {
      quantity: { id: 5 },
    },
  });

  const { handleSubmit, setError } = methods;

  // Preprocessing function for select value
  const preprocessData = (data: GenerateCodesFormData) => {
    const transformedData = {
      ...data,
      quantity: data.quantity.id,
    };
    return transformedData;
  };

  const onSubmit = handleSubmit(async (formData) => {
    const preprocessedFormData = preprocessData(formData);
    const { data, status } = await fetchCreateCodes(preprocessedFormData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof GenerateCodesFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `admin-panel-garantia-create:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.CREATED) {
      enqueueSnackbar(
        t("admin-panel-garantia-create:alerts.garantia.success"),
        {
          variant: "success",
        }
      );
      router.push("/admin-panel/garantias");
    }
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {t("admin-panel-garantia-create:title")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormSelectInput<GenerateCodesFormData, OptionType>
                name="quantity"
                testId="quantity"
                label={t("admin-panel-garantia-create:inputs.quantity.label")}
                options={Array.from({ length: 6 }, (_, i) => ({
                  id: (i + 1) * 5,
                }))}
                keyValue="id"
                renderOption={(option) => option.id}
              />
            </Grid>

            <Grid item xs={12}>
              <GenerateCodesFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/users"
                >
                  {t("admin-panel-garantia-create:actions.cancel")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function CreateGarantias() {
  return <FormCreateGarantias />;
}

// export default withPageRequiredAuth(CreateGarantias);
export default CreateGarantias;
