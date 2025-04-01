import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Garantia } from "../../services/api/types/garantia";
import { useTranslation } from "@/services/i18n/client";
// import { Label } from "@mui/icons-material";
// import IconName from '@mui/icons-material/IconName'

export type ItemCardProps = {
  item: Garantia;
  onClick: () => void;
  action: string;
};

export function ItemCard({ item, onClick, action }: ItemCardProps) {
  // console.log({ item });
  const { t } = useTranslation("listing");

  return (
    <div>
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
          {item.status === "qualityChecked" ? (
            <div>
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
                    <div className={`qualityCheckItem`}>{qc.label}</div>
                  </Typography>
                ) : (
                  ""
                )
              )}
            </div>
          ) : (
            <div />
          )}
          {item.status === "assigned" ? (
            <div>
              <Typography variant="body2">
                <strong>
                  {t(
                    `listing:status.${item.status || "pendiente"}.description`
                  )}
                </strong>
                {new Date(item.registeredAt!).toLocaleDateString()}
              </Typography>
            </div>
          ) : (
            <div />
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
    </div>
  );
}
