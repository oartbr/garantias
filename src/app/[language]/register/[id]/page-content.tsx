"use client";
import Button from "@mui/material/Button";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { useAuthResetPasswordService } from "@/services/api/services/auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextInput from "@/components/form/text-input/form-text-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";

type RegisterFormData = {
  phoneNumber: string;
};

const useValidationSchema = () => {
  const { t } = useTranslation("register");

  return yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(
        /^\d{8,9}$|^\d{11}$/,
        t("register:inputs.phoneNumber.validation.invalid")
      )
      .required(t("register:inputs.phoneNumber.validation.required")),
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
      data-testid="register"
    >
      {t("register:workflow.confirm-phone.submit")}
    </Button>
  );
}

function Form() {
  const { enqueueSnackbar } = useSnackbar();
  const fetchAuthResetPassword = useAuthResetPasswordService();
  const { t } = useTranslation("register");
  const validationSchema = useValidationSchema();
  const router = useRouter();

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const params = new URLSearchParams(window.location.search);
    const hash = params.get("hash");
    if (!hash) return;

    const { data, status } = await fetchAuthResetPassword({
      password: formData.phoneNumber,
      hash,
    });

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof RegisterFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `register:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );

      return;
    }

    if (status === HTTP_CODES_ENUM.NO_CONTENT) {
      enqueueSnackbar(t("password-change:alerts.success"), {
        variant: "success",
      });

      router.replace("/sign-in");
    }
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h6">
                {t("register:workflow.confirm-phone.title")}
              </Typography>
              <Typography>
                {t("register:workflow.confirm-phone.subtitle")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              +593
              <FormTextInput<RegisterFormData>
                name="phoneNumber"
                label={t("register:inputs.phoneNumber.label")}
                type="phoneNumber"
                testId="phoneNumber"
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

function Register() {
  return <Form />;
}

export default withPageRequiredGuest(Register);
