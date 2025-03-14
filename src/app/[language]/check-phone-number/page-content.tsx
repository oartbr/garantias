"use client";
import Button from "@mui/material/Button";
//import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { useCheckPhoneNumberLoginService } from "@/services/api/services/garantia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextInput from "@/components/form/text-input/form-text-input";
import FormSelectInput from "@/components/form/select/form-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import {
  getCountryData,
  getCountryDataList,
  ICountryData,
  TCountryCode,
} from "countries-list";

type RegisterFormData = {
  phoneNumber: string;
  countryCode: { label: string; value: string };
};

type Props = {
  params: { language: string; id: string };
};

const useValidationSchema = () => {
  const { t } = useTranslation("register");

  return yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(
        /^\d{8,10}$|^\d{11}$/,
        t("register:inputs.phoneNumber.validation.invalid")
      )
      .required(t("register:inputs.phoneNumber.validation.required")),
    countryCode: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required(t("register:inputs.phoneNumber.validation.required")),
  });
};

function FormActions() {
  const { t } = useTranslation("register");
  const { isSubmitting } = useFormState();
  // const params = new URLSearchParams(window.location.search);
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      data-testid="register/"
    >
      {t("register:workflow.confirm-phone.submit")}
    </Button>
  );
}

function Form(props: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const fetchSendCode = useCheckPhoneNumberLoginService();
  const { t } = useTranslation("register");
  const validationSchema = useValidationSchema();
  const router = useRouter();
  console.log(props.params);

  const countryList = getCountryDataList()
    .filter((country: ICountryData) => country.continent === "SA")
    .map((country: ICountryData) => {
      return {
        label: country.name,
        value: country.iso2,
      };
    });

  const countryRenderOption = (option: { label: string }) => option.label;

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver<RegisterFormData>(validationSchema),
    defaultValues: {
      phoneNumber: "",
      countryCode: { label: "", value: "" },
    },
  });

  const changeCountry = (country: { label: string; value: string }) => {
    methods.setValue("countryCode", country);
  };

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    //const params = new URLSearchParams(window.location.search);
    //const hash = params.get("hash");
    const country = getCountryData(formData.countryCode.value as TCountryCode);
    const { data, status } = await fetchSendCode({
      phoneNumber: "+" + country.phone + formData.phoneNumber,
    });

    if (status === HTTP_CODES_ENUM.OK) {
      enqueueSnackbar(t("register:alerts.codeSent"), {
        variant: "success",
      });

      router.replace(`confirm-code?p=${country.phone}${formData.phoneNumber}`);
    }

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
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} mt={3} mb={3}>
              <Typography variant="h6">
                {t("register:workflow.confirm-phone.title")}
              </Typography>
              <Typography>
                {t("register:workflow.confirm-phone.subtitle")}
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <FormSelectInput
                  name="countryCode"
                  label={t("register:inputs.countryCode.label")}
                  options={countryList}
                  renderOption={countryRenderOption}
                  keyValue="value" // Assuming options is an array of objects with an 'id' key
                  testId="example-select-input"
                  onChange={changeCountry}
                />
              </Grid>
              <Grid item xs={7}>
                <FormTextInput<RegisterFormData>
                  name="phoneNumber"
                  label={t("register:inputs.phoneNumber.label")}
                  type="phoneNumber"
                  testId="phoneNumber"
                />
              </Grid>
            </Grid>
            <Grid item xs={7} mt={2}>
              <FormActions />
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function CheckPhoneNumber(props: Props) {
  return <Form params={props.params} />;
}

export default CheckPhoneNumber;
