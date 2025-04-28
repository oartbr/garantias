"use client";

import Button from "@mui/material/Button";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextInput from "@/components/form/text-input/form-text-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Link from "@/components/link";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import {
  useGetSKUService,
  usePatchSKUService,
} from "@/services/api/services/sku";
import { useParams } from "next/navigation";
import useAuth from "@/services/auth/use-auth";
// import FormSelectInput from "@/components/form/select/form-select";
import useLeavePage from "@/services/leave-page/use-leave-page";
import { useRouter } from "next/navigation";
import { SKU } from "@/services/api/types/sku";

type EditSkuFormData = {
  skuId: string;
  description: string;
  category: string;
  capacity: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  material: string;
  cost?: number;
  price?: number;
  brand: string;
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-users-create");

  return yup.object().shape({
    skuId: yup
      .string()
      .required(t("admin-panel-sku-edit:inputs.skuId.validation.required")),
    description: yup
      .string()
      .required(
        t("admin-panel-sku-edit:inputs.description.validation.required")
      ),
    category: yup
      .string()
      .required(t("admin-panel-sku-edit:inputs.category.validation.required")),
    capacity: yup
      .number()
      .required(t("admin-panel-sku-edit:inputs.capacity.validation.required")),
    length: yup
      .number()
      .required(t("admin-panel-sku-edit:inputs.capacity.validation.required")),
    width: yup
      .number()
      .required(t("admin-panel-sku-edit:inputs.capacity.validation.required")),
    height: yup
      .number()
      .required(t("admin-panel-sku-edit:inputs.capacity.validation.required")),
    weight: yup
      .number()
      .required(t("admin-panel-sku-edit:inputs.weight.validation.required")),
    material: yup
      .string()
      .required(t("admin-panel-sku-edit:inputs.material.validation.required")),
    cost: yup.number(),
    price: yup.number(),
    brand: yup
      .string()
      .required(t("admin-panel-sku-edit:inputs.price.validation.required")),
  });
};

function EditSkuFormActions() {
  const { t } = useTranslation("admin-panel-sku-edit");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      {t("admin-panel-sku-edit:actions.submit")}
    </Button>
  );
}

function FormEditSku() {
  const params = useParams();

  const { user } = useAuth();
  const userId = user?.id;
  const id = params.id;

  const router = useRouter();

  const fetchGetSku = useGetSKUService();
  const fetchPatchSku = usePatchSKUService();
  const [skuData, setSkuData] = useState<SKU>({} as SKU);

  const { t } = useTranslation("admin-panel-sku-edit");
  const validationSchema = useValidationSchema();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditSkuFormData>({
    resolver: yupResolver(validationSchema),
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

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchPatchSku({
      skuId: id.toString(),
      data: { ...formData },
    });
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof EditSkuFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `admin-panel-sku-edit:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.OK) {
      reset(formData);
      enqueueSnackbar(t("admin-panel-sku-edit:alerts.update.success"), {
        variant: "success",
      });
      router.push("/admin-panel/skus");
    }
  });

  useEffect(() => {
    const getInitialDataForEdit = async () => {
      const { status: getStatus, data: results } = await fetchGetSku({
        id: id.toString(),
      });

      if (
        getStatus === HTTP_CODES_ENUM.OK &&
        results !== null &&
        results.sku !== null
      ) {
        setSkuData(results.sku);
        reset(results.sku);
      }
    };

    getInitialDataForEdit();
  }, [id, userId, reset, fetchGetSku]);

  if (!skuData) {
    return <div>Loading...</div>;
  } else {
  }

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {t("admin-panel-sku-edit:title")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="brand"
                testId="brand"
                label={t("admin-panel-sku-edit:inputs.brand.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="skuId"
                testId="skuId"
                label={t("admin-panel-sku-edit:inputs.skuId.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="description"
                testId="description"
                label={t("admin-panel-sku-edit:inputs.description.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="category"
                testId="category"
                label={t("admin-panel-sku-edit:inputs.category.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="capacity"
                testId="capacity"
                label={t("admin-panel-sku-edit:inputs.capacity.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="length"
                testId="length"
                label={t("admin-panel-sku-edit:inputs.length.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="width"
                testId="width"
                label={t("admin-panel-sku-edit:inputs.width.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="height"
                testId="height"
                label={t("admin-panel-sku-edit:inputs.height.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="weight"
                testId="weight"
                label={t("admin-panel-sku-edit:inputs.weight.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="material"
                testId="material"
                label={t("admin-panel-sku-edit:inputs.material.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="cost"
                testId="cost"
                label={t("admin-panel-sku-edit:inputs.cost.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<EditSkuFormData>
                name="price"
                testId="price"
                label={t("admin-panel-sku-edit:inputs.price.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <EditSkuFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/skus"
                >
                  {t("admin-panel-sku-edit:actions.cancel")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function EditSku() {
  return (
    <>
      <FormEditSku />
    </>
  );
}

export default withPageRequiredAuth(EditSku);
