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
import useAuth from "@/services/auth/use-auth";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Link from "@/components/link";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import {
  useGetGarantiaService,
  usePatchGarantiaService,
} from "@/services/api/services/garantia";
import { useParams } from "next/navigation";
import FormSelectInput from "@/components/form/select/form-select";
import useLeavePage from "@/services/leave-page/use-leave-page";
import { useRouter } from "next/navigation";
import { Garantia } from "@/services/api/types/garantia";
import { useGetSKUsService } from "@/services/api/services/sku";
import { SKU } from "@/services/api/types/sku";
import { SortEnum } from "@/services/api/types/sort-type";

type EditUserFormData = {
  description: string;
  firstName: string;
  lastName: string;
  sku: { label: string; value: string; description?: string; brand?: string };
  brand: string;
  address: string;
  number: number;
  city: string;
  zipcode: string;
};

const useValidationEditUserSchema = () => {
  const { t } = useTranslation("admin-panel-garantias-edit");

  return yup.object().shape({
    description: yup
      .string()
      .required(
        t("admin-panel-garantias-edit:inputs.firstName.validation.required")
      ),
    firstName: yup
      .string()
      .required(
        t("admin-panel-garantias-edit:inputs.firstName.validation.required")
      ),
    lastName: yup
      .string()
      .required(
        t("admin-panel-garantias-edit:inputs.lastName.validation.required")
      ),
    sku: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        description: yup.string(),
        brand: yup.string(),
      })
      .required(t("admin-panel-garantias-edit:inputs.sku.validation.required")),
    brand: yup
      .string()
      .required(
        t("admin-panel-garantias-edit:inputs.brand.validation.required")
      ),
    address: yup
      .string()
      .required(
        t("admin-panel-garantias-edit:inputs.lastName.validation.required")
      ),
    city: yup
      .string()
      .required(
        t("admin-panel-garantias-edit:inputs.lastName.validation.required")
      ),
    number: yup
      .number()
      .required(
        t("admin-panel-garantias-edit:inputs.lastName.validation.required")
      ),
    zipcode: yup
      .string()
      .required(
        t("admin-panel-garantias-edit:inputs.lastName.validation.required")
      ),
  });
};

function EditGarantiaFormActions() {
  const { t } = useTranslation("admin-panel-garantias-edit");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      {t("admin-panel-garantias-edit:actions.submit")}
    </Button>
  );
}

function FormEditGarantia() {
  const params = useParams();

  const garantiaId = params.id;
  const { user } = useAuth();
  const userId = user?.id;

  const router = useRouter();

  const fetchGetGarantia = useGetGarantiaService();
  const fetchPatchGarantia = usePatchGarantiaService();
  const [garantiaData, setGarantiaData] = useState<Garantia | null>(null);

  const { t } = useTranslation("admin-panel-garantias-edit");
  const validationSchema = useValidationEditUserSchema();

  const { enqueueSnackbar } = useSnackbar();

  const skuAllList = useGetSKUsService();
  const [skuList, setSkuTotal] = useState<
    {
      label: string;
      value: string;
      description: string | undefined;
      brand: string | undefined;
    }[]
  >([]);

  useEffect(() => {
    const fetchSkuTotal = async () => {
      try {
        const response = await skuAllList({
          page: 0,
          limit: 999,
          sort: [{ order: SortEnum.ASC, orderBy: "capacity" }],
        });
        if (response && response.data && "results" in response.data) {
          const skus = (response.data.results as SKU[]).map((sku: SKU) => ({
            label: sku.skuId,
            value: sku.skuId,
            description: sku.description,
            brand: sku.brand,
          }));
          setSkuTotal(skus);
        } else {
          console.error("Error: No results found in response");
        }
      } catch (error) {
        console.error("Error fetching sku total:", error);
      }
    };

    fetchSkuTotal();
  }, [skuAllList]);

  const skuRenderOption = (option: { label: string }) => option.label;

  const methods = useForm<EditUserFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      description: "",
      sku: { label: "", value: "" },
      firstName: "",
      lastName: "",
      brand: "",
      address: "",
      city: "",
      number: 0,
      zipcode: "",
    },
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const skuAsStringFormData = {
      ...formData,
      sku: formData.sku.value,
      description: formData.sku.description,
      brand: formData.sku.brand,
    };
    const { data, status } = await fetchPatchGarantia({
      garantiaId: garantiaId.toString(),
      data: {
        ...skuAsStringFormData,
      },
    });
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof EditUserFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `admin-panel-garantias-edit:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.OK) {
      reset(formData);
      enqueueSnackbar(t("admin-panel-garantias-edit:alerts.user.success"), {
        variant: "success",
      });
      router.push("/admin-panel/garantias");
    }
  });

  const updateSKU = (option: {
    description?: string;
    brand?: string;
    id?: string;
    skuId?: string;
  }) => {
    if (option) {
      reset({
        description: option.description ?? "",
        sku: option,
        brand: option.brand ?? "",
      });
    }
    return option;
  };

  useEffect(() => {
    const getInitialDataForEdit = async () => {
      const { status: getStatus, data: results } = await fetchGetGarantia({
        garantiaId: garantiaId.toString(),
        userId: userId || undefined,
      });

      if (getStatus === HTTP_CODES_ENUM.OK) {
        setGarantiaData(results.garantia);
        // console.log({ garantia: results.garantia });
        reset({
          description: results.garantia?.description ?? "",
          sku: {
            value: results.garantia?.sku,
            label: results.garantia?.sku,
          },
          firstName: results.garantia?.firstName ?? "",
          lastName: results.garantia?.lastName ?? "",
          brand: results.garantia?.brand ?? "",
          address: results.garantia?.address ?? "",
          city: results.garantia?.city ?? "",
          number:
            typeof results.garantia?.number !== "undefined"
              ? Number(results.garantia?.number)
              : 0,
          zipcode: results.garantia?.zipcode ?? "",
        });
      }
    };

    getInitialDataForEdit();
  }, [garantiaId, userId, reset, fetchGetGarantia, skuList]);

  if (!garantiaData) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {t("admin-panel-garantias-edit:title1")} {garantiaId}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormSelectInput
                name="sku"
                label="Select SKU"
                options={skuList}
                renderOption={skuRenderOption}
                keyValue="value" // Assuming options is an array of objects with an 'id' key
                testId="example-select-input"
                onChange={updateSKU}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditUserFormData>
                name="brand"
                testId="brand"
                label={t("admin-panel-garantias-edit:inputs.brand.label")}
                disabled // Add the disabled prop to make the field unable to be edited
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditUserFormData>
                name="description"
                testId="description"
                label={t("admin-panel-garantias-edit:inputs.description.label")}
                disabled // Add the disabled prop to make the field unable to be edited
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditUserFormData>
                name="firstName"
                testId="first-name"
                label={t("admin-panel-garantias-edit:inputs.firstName.label")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditUserFormData>
                name="lastName"
                testId="last-name"
                label={t("admin-panel-garantias-edit:inputs.lastName.label")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditUserFormData>
                name="address"
                testId="address"
                label={t("admin-panel-garantias-edit:inputs.address.label")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditUserFormData>
                name="number"
                testId="number"
                label={t("admin-panel-garantias-edit:inputs.number.label")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditUserFormData>
                name="city"
                testId="city"
                label={t("admin-panel-garantias-edit:inputs.city.label")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditUserFormData>
                name="zipcode"
                testId="zip-code"
                label={t("admin-panel-garantias-edit:inputs.zipcode.label")}
              />
            </Grid>

            <Grid item xs={12}>
              <EditGarantiaFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/garantias"
                >
                  {t("admin-panel-garantias-edit:actions.cancel")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function EditGarantia() {
  return (
    <>
      <FormEditGarantia />
    </>
  );
}

export default withPageRequiredAuth(EditGarantia);
