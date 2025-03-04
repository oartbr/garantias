//import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Nota } from "../../services/api/types/nota";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);

// import { Label } from "@mui/icons-material";
// import IconName from '@mui/icons-material/IconName'

export type ItemCardProps = {
  item: Nota;
  onClick: () => void;
  action: string;
};

export function ItemCard({ item, onClick, action }: ItemCardProps) {
  // console.log({ item });

  return (
    <div>
      <Card elevation={3} className={`${item.status}Card`}>
        <CardContent>
          <Typography variant="h1" component="div" sx={{ fontSize: 26 }}>
            {(() => {
              const registerDate = new Date(
                item.registeredAt
              ).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
              });

              const purchaseDate = new Date(
                item.purchaseDate
              ).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
              });

              switch (item.status) {
                case "pending":
                  return `⌛ Registrada em ${registerDate}, ${dayjs(item.registeredAt).locale("pt-br").fromNow()}.`;
                case "read":
                  return `📃 Compra feita ${dayjs(item.purchaseDate).locale("pt-br").fromNow()}.`;
                case "canceled":
                  return `😱 Cancelada em ${purchaseDate}`;
                case "flagged":
                  return `📣 A nota foi marcada em ${purchaseDate}`;
                default:
                  return "";
              }
            })()}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "text.secondary",
              marginLeft: (theme) => theme.spacing(5),
            }}
          >
            {item.vendorName}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              marginLeft: (theme) => theme.spacing(5),
            }}
          >
            {dayjs(item.purchaseDate)
              .locale("pt-br")
              .format("DD/MM/YYYY HH:mm")}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              marginLeft: (theme) => theme.spacing(5),
            }}
          >
            {Number(item.total) > 0 && `R$${item.total}`}
          </Typography>
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
