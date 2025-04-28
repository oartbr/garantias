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
import { CreateSKUsService } from "@/services/api/services/sku";
import { useRouter } from "next/navigation";
// import { Role } from "@/services/api/types/role";
//import FormSelectInput from "@/components/form/select/form-select";
import FormTextInput from "@/components/form/text-input/form-text-input";
//import withPageRequiredGuest from "@/services/auth/with-page-required-guest";

interface CreateSkuFormData {
  skuId: string;
  description: string;
  category: string;
  capacity: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  material: string;
  cost: number;
  price: number;
  brand: string;
}

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-users-create");

  return yup.object().shape({
    skuId: yup
      .string()
      .required(t("admin-panel-sku-create:inputs.skuId.validation.required")),
    description: yup
      .string()
      .required(
        t("admin-panel-sku-create:inputs.description.validation.required")
      ),
    category: yup
      .string()
      .required(
        t("admin-panel-sku-create:inputs.category.validation.required")
      ),
    capacity: yup
      .number()
      .required(
        t("admin-panel-sku-create:inputs.capacity.validation.required")
      ),
    length: yup
      .number()
      .required(
        t("admin-panel-sku-create:inputs.capacity.validation.required")
      ),
    width: yup
      .number()
      .required(
        t("admin-panel-sku-create:inputs.capacity.validation.required")
      ),
    height: yup
      .number()
      .required(
        t("admin-panel-sku-create:inputs.capacity.validation.required")
      ),
    weight: yup
      .number()
      .required(t("admin-panel-sku-create:inputs.weight.validation.required")),
    material: yup
      .string()
      .required(
        t("admin-panel-sku-create:inputs.material.validation.required")
      ),
    cost: yup
      .number()
      .required(t("admin-panel-sku-create:inputs.cost.validation.required")),
    price: yup
      .number()
      .required(t("admin-panel-sku-create:inputs.price.validation.required")),
    brand: yup
      .string()
      .required(t("admin-panel-sku-create:inputs.price.validation.required")),
  });
};

function CreateSkuFormActions() {
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
      {t("admin-panel-sku-create:actions.create")}
    </Button>
  );
}

function FormCreateSKUs() {
  const router = useRouter();
  const fetchCreateCodes = CreateSKUsService();
  const { t } = useTranslation("admin-panel-sku-create");
  const validationSchema = useValidationSchema();

  const { enqueueSnackbar } = useSnackbar();

  const resolver: Resolver<CreateSkuFormData> = yupResolver(validationSchema);

  const methods = useForm<CreateSkuFormData>({
    resolver,
    defaultValues: {
      skuId: "",
      description: "",
      category: "",
      capacity: 0,
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      material: "",
      cost: 0,
      price: 0,
      brand: "WSE",
    },
  });

  const { handleSubmit, setError } = methods;

  // Preprocessing function for select value
  const preprocessData = (data: CreateSkuFormData) => {
    const transformedData = {
      ...data,
      skuId: data.skuId,
      description: data.description,
      category: data.category,
      capacity: data.capacity,
      length: data.length,
      width: data.width,
      height: data.height,
      weight: data.weight,
      material: data.material,
      cost: data.cost,
      price: data.price,
      brand: data.brand,
    };
    return transformedData;
  };

  const onSubmit = handleSubmit(async (formData) => {
    const preprocessedFormData = preprocessData(formData);
    const { data, status } = await fetchCreateCodes(preprocessedFormData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof CreateSkuFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `admin-panel-sku-create:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.CREATED) {
      enqueueSnackbar(t("admin-panel-sku-create:alerts.sku.success"), {
        variant: "success",
      });
      router.push("/admin-panel/skus");
    }
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {t("admin-panel-sku-create:title")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="brand"
                testId="brand"
                label={t("admin-panel-sku-create:inputs.brand.label")}
                disabled // Disable the input field
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="skuId"
                testId="skuId"
                label={t("admin-panel-sku-create:inputs.skuId.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="description"
                testId="description"
                label={t("admin-panel-sku-create:inputs.description.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="category"
                testId="category"
                label={t("admin-panel-sku-create:inputs.category.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="capacity"
                testId="capacity"
                label={t("admin-panel-sku-create:inputs.capacity.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="length"
                testId="length"
                label={t("admin-panel-sku-create:inputs.length.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="width"
                testId="width"
                label={t("admin-panel-sku-create:inputs.width.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="height"
                testId="height"
                label={t("admin-panel-sku-create:inputs.height.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="weight"
                testId="weight"
                label={t("admin-panel-sku-create:inputs.weight.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="material"
                testId="material"
                label={t("admin-panel-sku-create:inputs.material.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="cost"
                testId="cost"
                label={t("admin-panel-sku-create:inputs.cost.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<CreateSkuFormData>
                name="price"
                testId="price"
                label={t("admin-panel-sku-create:inputs.price.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <CreateSkuFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/users"
                >
                  {t("admin-panel-sku-create:actions.cancel")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function CreateSKUs() {
  return <FormCreateSKUs />;
}

// export default withPageRequiredAuth(CreateSKUs);
export default CreateSKUs;
