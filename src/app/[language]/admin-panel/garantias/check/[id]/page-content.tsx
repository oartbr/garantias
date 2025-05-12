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
  useQualityCheckGarantiaService,
} from "@/services/api/services/garantia";
import { useParams } from "next/navigation";
import FormSelectInput from "@/components/form/select/form-select";
import FormCheckboxInput from "@/components/form/checkbox/form-checkbox";
import useLeavePage from "@/services/leave-page/use-leave-page";
import { useRouter } from "next/navigation";
import { Garantia } from "@/services/api/types/garantia";
import { useGetSKUsService } from "@/services/api/services/sku";
import { SKU } from "@/services/api/types/sku";
import { SortEnum } from "@/services/api/types/sort-type";

type QualityCheckFormData = {
  description?: string;
  sku: { label: string; value: string; description?: string; brand?: string };
  brand?: string;
  qualityCheck: Option[];
};

// Define the type for your option
type Option = {
  id: string;
  label: string;
  mandatory?: boolean;
};

const useValidationEditUserSchema = () => {
  const { t } = useTranslation("admin-panel-garantias-check");

  return yup.object().shape({
    sku: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        description: yup.string(),
        brand: yup.string(),
      })
      .required(
        t("admin-panel-garantias-check:inputs.sku.validation.required")
      ),
    brand: yup.string(),
    description: yup.string(),
    qualityCheck: yup
      .array(
        yup.object({
          label: yup.string().required(),
          id: yup.string().required(),
          mandatory: yup.boolean(),
        })
      )
      .test(
        "mandatory-check",
        t(
          "admin-panel-garantias-check:inputs.qualityCheck.validation.mandatory"
        ),
        function (value) {
          // In this example we assume that mandatory options have ids: "a", "b", "c", "e", "f", "g", "h".
          // Adjust the list below based on your business logic.
          const mandatoryIds = ["a", "b", "c", "e", "f", "g", "h"];
          const selectedIds = value ? value.map((item) => item.id) : [];
          return mandatoryIds.every((id) => selectedIds.includes(id));
        }
      )
      .required(
        t(
          "admin-panel-garantias-check:inputs.qualityCheck.validation.mandatory"
        )
      ),
  });
};

function EditGarantiaFormActions() {
  const { t } = useTranslation("admin-panel-garantias-check");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      {t("admin-panel-garantias-check:actions.submit")}
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
  const fetchPatchGarantia = useQualityCheckGarantiaService();
  const [garantiaData, setGarantiaData] = useState<Garantia | null>(null);

  const { t } = useTranslation("admin-panel-garantias-check");
  const validationSchema = useValidationEditUserSchema();

  const { enqueueSnackbar } = useSnackbar();

  const skuAllList = useGetSKUsService();
  const [skuList, setSkuTotal] = useState<
    {
      label: string;
      value: string;
      description: string | undefined;
      brand: string | undefined;
      qualityCheck: Array<Option> | undefined;
    }[]
  >([]);

  useEffect(() => {
    const fetchSkuTotal = async () => {
      try {
        const response = await skuAllList({
          page: 0,
          limit: 999,
          sort: [{ order: SortEnum.DESC }],
        });
        if (response && response.data && "results" in response.data) {
          const skus = (response.data.results as SKU[]).map((sku: SKU) => ({
            label: sku.skuId,
            value: sku.skuId,
            description: sku.description,
            brand: sku.brand,
            qualityCheck: [],
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

  const methods = useForm<QualityCheckFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      description: "",
      sku: { label: "", value: "" },
      brand: "",
      qualityCheck: [{ label: "", id: "" }],
    },
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const skuAsStringFormData = {
      ...formData,
      sku: formData.sku.value,
      description: formData.sku.description,
      brand: formData.sku.brand,
      qualityCheck: formData.qualityCheck,
    };
    const { data, status } = await fetchPatchGarantia({
      garantiaId: garantiaId.toString(),
      data: {
        ...skuAsStringFormData,
      },
    });
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof QualityCheckFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `admin-panel-garantias-check:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.OK) {
      reset(formData);
      enqueueSnackbar(t("admin-panel-garantias-check:alerts.check.success"), {
        variant: "success",
      });
      router.push(`/${garantiaId}`);
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
        // console.log({ results: results.garantia.qualityCheck });
        reset({
          description: results.garantia?.description ?? "",
          sku: {
            value: results.garantia?.sku,
            label: results.garantia?.sku,
          },
          brand: results.garantia?.brand ?? "",
          qualityCheck: results.garantia?.qualityCheck,
        });
      }
    };

    getInitialDataForEdit();
  }, [garantiaId, userId, reset, fetchGetGarantia, skuList]);

  if (!garantiaData) {
    return <div>Loading...</div>;
  }

  const options: Option[] = [
    {
      id: "a",
      label: t("admin-panel-garantias-check:options.option1.label"),
      mandatory: true,
    },
    {
      id: "b",
      label: t("admin-panel-garantias-check:options.option2.label"),
      mandatory: true,
    },
    {
      id: "c",
      label: t("admin-panel-garantias-check:options.option3.label"),
      mandatory: true,
    },
    {
      id: "d",
      label: t("admin-panel-garantias-check:options.option4.label"),
      mandatory: false,
    },
    {
      id: "e",
      label: t("admin-panel-garantias-check:options.option5.label"),
      mandatory: true,
    },
    {
      id: "f",
      label: t("admin-panel-garantias-check:options.option6.label"),
      mandatory: true,
    },
    {
      id: "g",
      label: t("admin-panel-garantias-check:options.option7.label"),
      mandatory: true,
    },
    {
      id: "h",
      label: t("admin-panel-garantias-check:options.option8.label"),
      mandatory: true,
    },
  ];

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {t("admin-panel-garantias-check:titleAssign")} {garantiaId}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormSelectInput
                name="sku"
                label="Select SKU"
                options={skuList}
                renderOption={skuRenderOption}
                keyValue="value" // Assuming options is an array of objects with an 'id' key
                testId="select-input"
                onChange={updateSKU}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<QualityCheckFormData>
                name="brand"
                testId="brand"
                label={t("admin-panel-garantias-check:inputs.brand.label")}
                disabled // Add the disabled prop to make the field unable to be edited
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<QualityCheckFormData>
                name="description"
                testId="description"
                label={t(
                  "admin-panel-garantias-check:inputs.description.label"
                )}
                disabled // Add the disabled prop to make the field unable to be edited
              />
            </Grid>

            <Grid item xs={12}>
              <FormCheckboxInput
                name="qualityCheck"
                label={t("admin-panel-garantias-check:options.title")}
                options={options}
                keyValue="id"
                keyExtractor={(option: Option) => option.id}
                renderOption={(option: Option) => option.label}
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
                  {t("admin-panel-garantias-check:actions.cancel")}
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
