"use client";
import Button from "@mui/material/Button";
// import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useForm, FormProvider, useFormState } from "react-hook-form";
// import { useAuthResetPasswordService } from "@/services/api/services/auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import { useCheckCodeService } from "@/services/api/garantia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextInput from "@/components/form/text-input/form-text-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useRouter, useSearchParams } from "next/navigation";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import useAuthTokens from "@/services/auth/use-auth-tokens";

type RegisterFormData = {
  confirmationCode: string;
};

interface confirmStatus {
  confirmed: boolean;
  message: string;
  code: string;
}

type Props = {
  params: { language: string; id: string; confirmStatus: confirmStatus };
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
  const router = useRouter();
  //const params = new URLSearchParams(window.location.search);
  return (
    <div>
      <Grid container spacing={0} mb={2}>
        <Grid item xs={4} mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            data-testid="confirm-code/"
          >
            {t("register:workflow.get-code.submit")}
          </Button>
        </Grid>
        <Grid item xs={4} mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="button"
            disabled={isSubmitting}
            data-testid="resend-code/"
            onClick={() => router.replace("check-phone-number")}
          >
            {t("register:workflow.get-code.resend")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

function Form({ params }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  // delete? const fetchAuthResetPassword = useAuthResetPasswordService();
  const { t } = useTranslation("register");
  const validationSchema = useValidationSchema();
  const router = useRouter();
  const fetchCheckCode = useCheckCodeService();
  const searchParams = useSearchParams();
  const { setTokensInfo } = useAuthTokens();
  const { setUser } = useAuthActions();
  //console.log({ validation: searchParams.get("p") });

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver<RegisterFormData>(validationSchema),
    defaultValues: {
      confirmationCode: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    //const params = new URLSearchParams(window.location.search);
    //const hash = params.get("hash");
    const phoneNumber = searchParams.get("p");
    //const returnTo = searchParams.get("returnTo");

    const { data, status } = await fetchCheckCode({
      phoneNumber: phoneNumber ?? "",
      code: formData.confirmationCode,
    });
    // console.log({ data });
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

    if (status === HTTP_CODES_ENUM.PRECONDITION_REQUIRED) {
      enqueueSnackbar(t("register:alerts.wrong"), {
        variant: "error",
      });
    }

    if (status === HTTP_CODES_ENUM.TOO_MANY_REQUESTS) {
      enqueueSnackbar(t("register:alerts.exceeded"), {
        variant: "error",
      });

      router.replace("/check-phone-number");
    }

    if (status === HTTP_CODES_ENUM.OK) {
      enqueueSnackbar(t("register:alerts.codeConfirmed"), {
        variant: "success",
      });
      if (data.user) {
        setTokensInfo({
          token: data.token,
          refreshToken: data.refreshToken,
          tokenExpires: data.tokenExpires,
        });
        setUser(data.user);
        if (params.id) {
          // console.log({ go: "register" });
          router.replace(`register`);
        } else {
          // console.log({ go: "listing" });
          router.replace(`/listing`);
        }
      } else {
        // console.log({ go: "sign-up" });
        router.replace(`sign-up?p=${phoneNumber}`);
      }
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

export default ConfirmCode;
