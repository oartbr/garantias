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
  useGetGarantiaService,
  usePatchGarantiaService,
} from "@/services/api/services/garantia";
import { useParams } from "next/navigation";
// import FormSelectInput from "@/components/form/select/form-select";
import useLeavePage from "@/services/leave-page/use-leave-page";
import { useRouter } from "next/navigation";
import { Garantia } from "@/services/api/types/garantia";

type Props = {
  params: {
    language: string;
    id: string;
    userId: string | number;
    slug: string;
  };
  userId: string | number;
};

type EditUserFormData = {
  description: string;
  firstName: string;
  lastName: string;
  sku: string;
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
      .string()
      .required(
        t("admin-panel-garantias-edit:inputs.lastName.validation.required")
      ),
    brand: yup
      .string()
      .required(
        t("admin-panel-garantias-edit:inputs.lastName.validation.required")
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

function FormEditGarantia({ ...props }) {
  const params = useParams();

  const garantiaId = params.id;
  const userId = props.userId;

  const router = useRouter();

  const fetchGetGarantia = useGetGarantiaService();
  const fetchPatchGarantia = usePatchGarantiaService();
  const [garantiaData, setGarantiaData] = useState<Garantia | null>(null);

  const { t } = useTranslation("admin-panel-garantias-edit");
  const validationSchema = useValidationEditUserSchema();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditUserFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      description: "",
      sku: "",
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
    const { data, status } = await fetchPatchGarantia({
      garantiaId: garantiaId.toString(),
      data: {
        ...formData,
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

  useEffect(() => {
    const getInitialDataForEdit = async () => {
      const { status: getStatus, data: results } = await fetchGetGarantia({
        garantiaId: garantiaId.toString(),
        userId: userId,
      });

      if (getStatus === HTTP_CODES_ENUM.OK) {
        setGarantiaData(results.garantia);

        reset({
          description: results.garantia?.description ?? "",
          sku: results.garantia?.sku ?? "",
          firstName: results.garantia?.firstName ?? "",
          lastName: results.garantia?.lastName ?? "",
          brand: results.garantia?.brand ?? "",
          address: results.garantia?.address ?? "",
          city: results.garantia?.city ?? "",
          number: Number(results.garantia?.number) ?? 0,
          zipcode: results.garantia?.zipcode ?? "",
        });
      }
    };

    getInitialDataForEdit();
  }, [garantiaId, userId, reset, fetchGetGarantia]);

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
              <FormTextInput<EditUserFormData>
                name="sku"
                testId="sku"
                label={t("admin-panel-garantias-edit:inputs.sku.label")}
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
                disabled // Add the disabled prop to make the field unable to be edited
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditUserFormData>
                name="lastName"
                testId="last-name"
                label={t("admin-panel-garantias-edit:inputs.lastName.label")}
                disabled // Add the disabled prop to make the field unable to be edited
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
                label={t("admin-panel-garantias-edit:inputs.zipCode.label")}
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

function EditGarantia({ ...props }: Props) {
  return (
    <>
      <FormEditGarantia props={props.params} userId={props.userId} />
    </>
  );
}

export default withPageRequiredAuth(EditGarantia);
