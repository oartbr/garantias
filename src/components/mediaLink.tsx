import { useTranslation } from "@/services/i18n/client";
import Grid from "@mui/material/Grid";
import { forwardRef } from "react";
import MediaCard from "./itemCard/mediaCard";

const MediaLink = forwardRef<HTMLAnchorElement>(function MediaLink() {
  const { t } = useTranslation("listing");
  return (
    <Grid
      container
      spacing={2}
      direction={{ xs: "column", md: "row" }}
      alignItems="stretch"
      wrap="nowrap"
      className="mediaLinks"
    >
      <Grid item>
        <MediaCard
          title={t("listing:manual.installation.title")}
          description={t("listing:manual.installation.description")}
          onClick={() =>
            console.log(t("listing:manual.installation.description"))
          }
          action={t("listing:manual.installation.action")}
          url="https://www.youtube.com/watch?v=l3OrBS2WSog"
          target="_blank"
        />
      </Grid>
      <Grid item>
        <MediaCard
          title={t("listing:manual.functionalities.title")}
          description={t("listing:manual.functionalities.description")}
          onClick={() =>
            console.log(t("listing:manual.functionalities.description"))
          }
          action={t("listing:manual.functionalities.action")}
          url="https://www.youtube.com/watch?v=ZlX54y61RJc"
          target="_blank"
        />
      </Grid>
      <Grid item>
        <MediaCard
          title={t("listing:manual.maintenance.title")}
          description={t("listing:manual.maintenance.description")}
          onClick={() =>
            console.log(t("listing:manual.maintenance.description"))
          }
          action={t("listing:manual.maintenance.action")}
          url="https://www.youtube.com/watch?v=e9-PfyDAh7w"
          target="_blank"
        />
      </Grid>
    </Grid>
  );
});

export default MediaLink;
