"use client";
import Button from "@mui/material/Button";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextInput from "@/components/form/text-input/form-text-input";
import FormCheckboxInput from "@/components/form/checkbox/form-checkbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import Link from "@/components/link";
//import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  useRegisterGarantiaService,
  useGetUserByGarantiaIdService,
} from "@/services/api/services/garantia";
import { useAuthLoginService } from "@/services/api/services/auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
//import Divider from "@mui/material/Divider";
//import Chip from "@mui/material/Chip";

type TPolicy = {
  id: string;
  name: string;
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
  policy: TPolicy[];
};

const useValidationSchema = () => {
  const { t } = useTranslation("register");

  return yup.object().shape({
    firstName: yup
      .string()
      .required(t("register:inputs.firstName.validation.required")),
    lastName: yup
      .string()
      .required(t("register:inputs.lastName.validation.required")),
    address: yup
      .string()
      .required(t("register:inputs.address.validation.required")),
    number: yup
      .number()
      .required(t("register:inputs.number.validation.required")),
    city: yup.string().required(t("register:inputs.city.validation.required")),
    zipcode: yup
      .string()
      .required(t("register:inputs.zipcode.validation.required")),
    email: yup
      .string()
      .email(t("register:inputs.email.validation.invalid"))
      .required(t("register:inputs.email.validation.required")),
    password: yup
      .string()
      .min(6, t("register:inputs.password.validation.min"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        t("register:inputs.password.validation.required")
      )
      .required(t("register:inputs.password.validation.required")),
    policy: yup
      .array()
      .min(1, t("register:inputs.policy.validation.required"))
      .required(),
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

/* function UseDetails() {
  //const { t } = useTranslation("register");
  // const { isSubmitting } = useFormState();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      data-testid="register-submit"
    >
      Use current details
    </Button>
  );
}

function UpdateDetails() {
  //const { t } = useTranslation("register");
  // const { isSubmitting } = useFormState();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      data-testid="register-submit"
    >
      Update details
    </Button>
  );
}
  */

function Form(props: Props) {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const fetchAuthLogin = useAuthLoginService();
  //const fetchAuthRegister = useAuthSignUpService();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { t } = useTranslation("register");
  const validationSchema = useValidationSchema();
  const policyOptions = [
    { id: "policy", name: t("register:inputs.policy.agreement") },
  ];

  const garantiaId = props.params.id;
  const fetchRegisterGarantia = useRegisterGarantiaService();

  const fetchUserByGarantiaId = useGetUserByGarantiaIdService();

  //const [userData, setUserData] = useState({});
  //const [isLoading, setIsLoading] = useState({});

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      number: 0,
      city: "",
      zipcode: "",
      email: "",
      policy: [],
      garantiaId: garantiaId,
    },
  });

  useEffect(() => {
    const updateFormFields = (newValues: Partial<RegisterFormData>) => {
      methods.reset({ ...methods.getValues(), ...newValues });
    };

    setIsLoading(true);
    fetchUserByGarantiaId({ garantiaId })
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
        if (data.status === HTTP_CODES_ENUM.ACCEPTED) {
          updateFormFields(data.data);
          return data;
        }
        return false;
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setError(err);
        setIsLoading(false);
      });
  }, [fetchUserByGarantiaId, garantiaId, setError, methods]);

  useEffect(() => {
    setIsLoading(true);
    fetchUserByGarantiaId({ garantiaId })
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
        if (data.status === HTTP_CODES_ENUM.ACCEPTED) {
          updateFormFields(data.data);
          return data;
        }
        return false;
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setError(err);
        setIsLoading(false);
      });
  }, [fetchUserByGarantiaId, garantiaId, setError, methods]);

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    formData.garantiaId = props.params.id;
    try {
      delete formData.isEmailVerified;
      delete formData.phoneNumber;
      delete formData.id;
    } catch (e) {}

    const { data: dataRegister, status: statusRegister } =
      await fetchRegisterGarantia(formData);

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

    if (statusRegister === HTTP_CODES_ENUM.ACCEPTED) {
      enqueueSnackbar(t("register:alerts.codeConfirmed"), {
        variant: "success",
      });

      router.replace("listing");
    }
    const { data: dataSignIn, status: statusSignIn } = await fetchAuthLogin({
      email: formData.email,
      password: formData.password,
    });

    if (statusSignIn === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: dataSignIn.token,
        refreshToken: dataSignIn.refreshToken,
        tokenExpires: dataSignIn.tokenExpires,
      });
      setUser(dataSignIn.user);
    }
  });

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
              >
                popopo
              </FormTextInput>
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
            {/* <Grid item xs={12}>
              <FormTextInput<RegisterFormData>
                name="confirmEmail"
                label={t("register:inputs.confirmEmail.label")}
                type="confirmEmail"
                testId="confirmEmail"
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormTextInput<SignUpFormData>
                name="password"
                label={t("register:inputs.password.label")}
                type="password"
                testId="password"
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

export default withPageRequiredGuest(Register);
