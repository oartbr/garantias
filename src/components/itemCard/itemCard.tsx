//import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Nota } from "../../services/api/types/nota";
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
      <Card elevation={3} className="normalCard">
        <CardContent>
          <Typography variant="h1" component="div" sx={{ fontSize: 24 }}>
            {(() => {
              switch (item.status) {
                case "pending":
                  return "🧲 Nota Pendente";
                case "read":
                  return "📃 Nota Completa";
                case "canceled":
                  return "😱 Nota Cancelda";
                case "flagged":
                  return "📣 Nota com Alerta";
                default:
                  return "";
              }
            })()}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              mb: 1.5,
              marginLeft: (theme) => theme.spacing(5),
            }}
          >
            Registrada em:{" "}
            {new Date(item.registeredAt).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "2-digit",
            })}
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
