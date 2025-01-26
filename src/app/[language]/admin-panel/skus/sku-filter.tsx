"use client";

import FormMultipleSelectInput from "@/components/form/multiple-select/form-multiple-select";
import { Status, StatusEnum } from "@/services/api/types/status";
import { useTranslation } from "@/services/i18n/client";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SkuFilterType } from "./sku-filter-types";

type SkuFilterFormData = SkuFilterType;

function SkuFilter() {
  const { t } = useTranslation("admin-panel-garantias");
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<SkuFilterFormData>({
    defaultValues: {
      status: [],
    },
  });

  const { handleSubmit, reset } = methods;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "garantia-filter-popover" : undefined;

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      handleClose();
      const filterParsed = JSON.parse(filter);
      reset(filterParsed);
    }
  }, [searchParams, reset]);

  return (
    <FormProvider {...methods}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Container
          sx={{
            minWidth: 300,
          }}
        >
          <form
            onSubmit={handleSubmit((data) => {
              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set("filter", JSON.stringify(data));
              router.push(
                window.location.pathname + "?" + searchParams.toString()
              );
            })}
          >
            <Grid container spacing={2} mb={3} mt={3}>
              <Grid item xs={12}>
                <FormMultipleSelectInput<SkuFilterFormData, Pick<Status, "id">>
                  name="status"
                  testId="status"
                  label={t("admin-panel-garantias:filter.inputs.status.label")}
                  options={[
                    {
                      id: StatusEnum.created,
                    },
                    {
                      id: StatusEnum.assigned,
                    },
                    {
                      id: StatusEnum.registered,
                    },
                    {
                      id: StatusEnum.canceled,
                    },
                  ]}
                  keyValue="id"
                  renderOption={(option) =>
                    t(
                      `admin-panel-garantias:filter.inputs.status.options.${option.id}`
                    )
                  }
                  renderValue={(values) =>
                    values
                      .map((value) =>
                        t(
                          `admin-panel-garantias:filter.inputs.status.options.${value.id}`
                        )
                      )
                      .join(", ")
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  {t("admin-panel-garantias:filter.actions.apply")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Popover>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        {t("admin-panel-garantias:filter.actions.filter")}
      </Button>
    </FormProvider>
  );
}

export default SkuFilter;
