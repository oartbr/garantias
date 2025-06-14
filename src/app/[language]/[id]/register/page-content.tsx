"use client";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { t } from "i18next";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import FormCheckboxInput from "@/components/form/checkbox/form-checkbox";
import FormTextInput from "@/components/form/text-input/form-text-input";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import {
  useGetUserByGarantiaIdService,
  useRegisterGarantiaService,
} from "@/services/api/garantia";
import useAuth from "@/services/auth/use-auth";
import { Garantia } from "@/services/api/types/garantia";
import { useEffect, useState } from "react";

type TPolicy = {
  id?: string;
  name?: string;
};

type Props = {
  params: { language: string; id: string };
};

type RegisterFormData = {
  firstName: string;
  lastName: string;
  address: string;
  number: number;
  city: string;
  zipcode: string;
  email: string;
  policy: { id?: string; name?: string }[];
  garantiaId?: string;
  userId?: string | undefined;
  phoneNumber?: string;
};

const useValidationSchema = () => {
  return yup.object().shape({
    id: yup.string().optional(),
    phoneNumber: yup.string().optional(),
    garantiaId: yup.string().optional(),
    userId: yup.string().optional(),
    number: yup.number().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    city: yup.string().required(),
    zipcode: yup.string().required(),
    policy: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().optional(),
          name: yup.string().optional(),
        })
      )
      .required(), // Update 'optional()' to 'required()'
    isEmailVerified: yup.boolean().optional(),
  });
};

function FormActions() {
  const { t } = useTranslation("register");
  const { isSubmitting } = useFormState();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      data-testid="register-submit"
    >
      {t("register:actions.submit")}
    </Button>
  );
}

const policyO: TPolicy[] = [
  {
    id: "policy",
    name: t("register:inputs.policy.agreement"),
  },
];

function Form(props: Props) {
  const fetchRegisterGarantia = useRegisterGarantiaService();
  const router = useRouter();
  const { t } = useTranslation("register");
  const { user } = useAuth();
  const fetchUserByGarantiaId = useGetUserByGarantiaIdService();
  const [garantiaData, setGarantiaData] = useState<Garantia | null>(null);

  const validationSchema: yup.ObjectSchema<RegisterFormData> =
    useValidationSchema();

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver<RegisterFormData>(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      number: 0,
      city: "",
      zipcode: "",
      email: "",
      policy: policyO || [],
    },
  });

  const policyOptions = [
    { id: "policy", name: t("register:inputs.policy.agreement") },
  ];

  const { handleSubmit, setError } = methods;
  const garantiaId = props.params.id || "";

  const onSubmit = handleSubmit(async (formData) => {
    const extendedFormData: RegisterFormData = {
      ...formData,
      garantiaId: garantiaId,
      userId: user?.id.toString() || "",
      phoneNumber: user?.phoneNumber?.toString() || "",
    };

    const { data: dataRegister, status: statusRegister } =
      await fetchRegisterGarantia(extendedFormData);

    if (statusRegister === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (
        Object.keys(dataRegister.errors) as Array<keyof RegisterFormData>
      ).forEach((key) => {
        setError(key, {
          type: "manual",
          message: t(
            `register:inputs.${key}.validation.server.${dataRegister.errors[key]}`
          ),
        });
      });

      return;
    }

    if (statusRegister === HTTP_CODES_ENUM.OK) {
      enqueueSnackbar(t("register:alerts.codeConfirmed"), {
        variant: "success",
      });
      // console.log("Register success:", dataRegister);
      router.replace("/" + garantiaId);
    }
  });

  useEffect(() => {
    // Add useEffect hook to fetch garantia data
    if (garantiaId) {
      const fetchGarantia = async () => {
        const { data, status } = await fetchUserByGarantiaId({ garantiaId });
        if (status === HTTP_CODES_ENUM.OK) {
          const garantia: Garantia = {
            ...data,
            garantiaId: "", // Add the missing property
            registeredAt: "", // Add the missing property
            status: status.toString(), // Convert the 'status' property to a string
          };
          setGarantiaData(garantia);
        }
      };
      fetchGarantia();
    }
  }, [fetchUserByGarantiaId, garantiaId, garantiaData]);

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h6">{t("register:title")}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<RegisterFormData>
                name="firstName"
                label={t("register:inputs.firstName.label")}
                type="text"
                autoFocus
                testId="first-name"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<RegisterFormData>
                name="lastName"
                label={t("register:inputs.lastName.label")}
                type="text"
                testId="last-name"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<RegisterFormData>
                name="address"
                label={t("register:inputs.address.label")}
                type="address"
                testId="address"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<RegisterFormData>
                name="number"
                label={t("register:inputs.number.label")}
                type="number"
                testId="number"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<RegisterFormData>
                name="city"
                label={t("register:inputs.city.label")}
                type="city"
                testId="city"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<RegisterFormData>
                name="zipcode"
                label={t("register:inputs.zipcode.label")}
                type="zipcode"
                testId="zipcode"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<RegisterFormData>
                name="email"
                label={t("register:inputs.email.label")}
                type="email"
                testId="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormCheckboxInput
                name="policy"
                label=""
                testId="privacy"
                options={policyOptions}
                keyValue="id"
                keyExtractor={(option) => option.id.toString()}
                renderOption={(option) => (
                  <span>
                    {option.name}
                    <MuiLink href="/privacy-policy" target="_blank">
                      {t("register:inputs.policy.label")}
                    </MuiLink>
                  </span>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <FormActions />
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function Register(props: Props) {
  return <Form params={props.params} />;
}

export default withPageRequiredAuth(Register);
