import Grid from "@mui/material/Grid";
import FormTextInput from "@/components/form/text-input/form-text-input";
import FormSelectInput from "@/components/form/select/form-select";
import { getCountryDataList, ICountryData } from "countries-list";
import { useTranslation } from "@/services/i18n/client";
import { useFormContext, Controller } from "react-hook-form";

interface PhoneNumberFormProps {
  name: string;
}

const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({ name }) => {
  const { control } = useFormContext();
  const { t } = useTranslation("register");

  const countryList = getCountryDataList()
    .filter((country: ICountryData) => country.continent === "SA")
    .map((country: ICountryData) => {
      return {
        label: country.name,
        value: country.iso2,
        code: country.phone,
      };
    });

  const countryRenderOption = (option: { label: string }) => option.label;

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Controller
          name={`${name}.countryCode`}
          control={control}
          render={({ field }) => (
            <FormSelectInput
              {...field}
              label={t("register:inputs.countryCode.label")}
              options={countryList}
              renderOption={countryRenderOption}
              keyValue="value"
              testId="example-select-input"
            />
          )}
        />
      </Grid>
      <Grid item xs={7}>
        <Controller
          name={`${name}.phoneNumber`}
          control={control}
          render={({ field }) => (
            <FormTextInput
              {...field}
              label={t("register:inputs.phoneNumber.label")}
              type="text"
              testId="phoneNumber"
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default PhoneNumberForm;
