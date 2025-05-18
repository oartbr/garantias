//import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);

// import { Label } from "@mui/icons-material";
// import IconName from '@mui/icons-material/IconName'
export type ItemCardProps = {
  item: {
    code: string;
    notaId: string;
    product: string;
    purchaseDate: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
    vendor: string;
  };
  onClick: () => void;
  action: string;
};

export function ItemCard({ item, onClick, action }: ItemCardProps) {
  console.log({ item });

  return (
    <div>
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "text.secondary",
              marginLeft: (theme) => theme.spacing(5),
            }}
          >
            {item.product}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              marginLeft: (theme) => theme.spacing(5),
            }}
          >
            {item.quantity} x {item.unitPrice}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              marginLeft: (theme) => theme.spacing(5),
            }}
          >
            {item.totalPrice}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              marginLeft: (theme) => theme.spacing(5),
            }}
          >
            {Number(item.totalPrice) > 0 && `R$${item.totalPrice}`}
          </Typography>
        </CardContent>
        <CardActions>
          {item.code !== "" || true ? (
            <Button onClick={onClick}>{item.code}</Button>
          ) : (
            <Button onClick={onClick}>{action}</Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
