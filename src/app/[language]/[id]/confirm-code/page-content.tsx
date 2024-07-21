"use client";
import Button from "@mui/material/Button";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useForm, FormProvider, useFormState } from "react-hook-form";
//import { useAuthResetPasswordService } from "@/services/api/services/auth";
import { useCheckCodeService } from "@/services/api/services/garantia";
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
  confirmationCode: string;
  confirmed: string;
};

interface confirmStatus {
  confirmed: boolean;
  message: string;
  code: string;
}

type Props = {
  params: { language: string; id: string };
  confirmStatus: confirmStatus;
};

const useValidationSchema = () => {
  const { t } = useTranslation("register");

  return yup.object().shape({
    confirmationCode: yup
      .string()
      .matches(/^\d{5}$/, t("register:inputs.code.validation.invalid"))
      .required(t("register:inputs.code.validation.required")),
  });
};

function FormActions() {
  const { t } = useTranslation("register");
  const { isSubmitting } = useFormState();
  const params = new URLSearchParams(window.location.search);
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      data-testid="confirm-code/"
      id={params.id}
    >
      {t("register:workflow.confirm-phone.submit")}
    </Button>
  );
}

function Form(props: Props) {
  const { enqueueSnackbar } = useSnackbar();
  // delete? const fetchAuthResetPassword = useAuthResetPasswordService();
  const { t } = useTranslation("register");
  const validationSchema = useValidationSchema();
  const router = useRouter();
  const fetchCheckCode = useCheckCodeService();

  //console.log({ validation: props.confirmStatus.message });

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      confirmationCode: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    //const params = new URLSearchParams(window.location.search);
    //const hash = params.get("hash");

    const { data, status } = await fetchCheckCode({
      garantiaId: props.params.id,
      code: formData.confirmationCode,
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

    if (status === HTTP_CODES_ENUM.ACCEPTED) {
      enqueueSnackbar(t("register:alerts.codeConfirmed"), {
        variant: "success",
      });

      router.replace("register");
    }
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h6">
                {t("register:workflow.get-code.title")}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <FormTextInput<RegisterFormData>
                name="confirmationCode"
                label={t("register:inputs.code.label")}
                type="code"
                testId="code"
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

function ConfirmCode(props: Props) {
  return <Form params={props.params} />;
}

export default withPageRequiredGuest(ConfirmCode);
