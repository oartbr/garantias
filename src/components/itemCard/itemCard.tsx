import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Garantia } from "@/services/api/types/garantia";
import { useTranslation } from "@/services/i18n/client";
import { User } from "@/services/api/types/user";
import Grid from "@mui/material/Grid";
// import { Label } from "@mui/icons-material";
// import IconName from '@mui/icons-material/IconName'

export type ItemCardProps = {
  item: Garantia;
  onClick: () => void;
  action: string;
  user?: User;
};

export function ItemCard({ item, onClick, action, user }: ItemCardProps) {
  // console.log({ item });
  const { t } = useTranslation("listing");
  const showQualityCheck = item.qualityCheck?.some((qc) => qc.id > "d");
  const internalStatus =
    item.status === "registered" &&
    typeof user !== "undefined" &&
    (user?.role?.name === "ADMIN" ||
      user?.role?.name === "QA" ||
      user?.role?.name === "SALES");
  if (item && item.phoneNumber) {
    item.phoneNumber = item.phoneNumber.replace("+", "");
  }
  return (
    <Grid>
      <Card elevation={3} className="normalCard">
        <CardHeader title={item.description} subheader={item.sku} />
        <CardContent>
          <Typography variant="body2">
            <strong>Código de Garantia:</strong> {item.garantiaId}
          </Typography>
          <Typography variant="body2">
            <strong>Status: </strong>
            {t("listing:status." + (item.status || "pendiente") + ".label")}
          </Typography>
          {showQualityCheck ? (
            <Grid>
              <Typography variant="body2">
                <strong>
                  {t(
                    `listing:status.${item.status || "pendiente"}.description`
                  )}
                </strong>
                {new Date(item.qualityCheckedAt!).toLocaleDateString()}
              </Typography>
              {item.qualityCheck!.map((qc, index) =>
                qc.id > "d" ? (
                  <Typography
                    key={qc.id || index}
                    variant="body2"
                    className={`QA-${qc.id}`}
                  >
                    <span className={`qualityCheckItem`}>{qc.label}</span>
                  </Typography>
                ) : (
                  ""
                )
              )}
            </Grid>
          ) : (
            <Grid />
          )}
          {internalStatus ? (
            <Grid>
              <Typography variant="body2">
                <strong>{t(`listing:fields.name.label`)}: </strong>
                {item.firstName} {item.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>{t(`listing:fields.phone.label`)}: </strong>
                {`+${item.phoneNumber}`}
              </Typography>
              <Typography variant="body2">
                <strong>{t(`listing:fields.address.label`)}: </strong>
                {item.address}, {item.number}
              </Typography>
              <Typography variant="body2">
                <strong>{t(`listing:fields.city.label`)}: </strong>
                {item.city} -
                <Button
                  href={`https://codigo-postal.co/ecuador/cp/${item.zipcode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                  color="primary"
                >
                  {item.zipcode}
                </Button>
              </Typography>
              <Typography variant="body2">
                <strong>
                  {t(`listing:status.${item.status || "created"}.description`)}
                </strong>
                {new Date(item.registeredAt!).toLocaleDateString()}
              </Typography>
            </Grid>
          ) : (
            <Grid />
          )}
        </CardContent>
        <CardActions>
          {item.status !== "assigned" || true ? (
            <Button onClick={onClick}>{action}</Button>
          ) : (
            <Button onClick={onClick}>{action}</Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
