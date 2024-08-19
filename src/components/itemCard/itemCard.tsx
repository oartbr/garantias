import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Garantia } from "../../services/api/types/garantia";
// import { Label } from "@mui/icons-material";
// import IconName from '@mui/icons-material/IconName'

export type ItemCardProps = {
  item: Garantia;
  onClick: () => void;
};

export function ItemCard({ item, onClick }: ItemCardProps) {
  // console.log({ item });

  return (
    <div>
      <Card elevation={3} className="normalCard">
        <CardHeader title={item.description} subheader={item.sku} />
        <CardContent>
          <Typography variant="body2">
            <strong>Código de Garantia:</strong> {item.garantiaId}
          </Typography>
          <Typography variant="body2">
            <strong>Marca:</strong> {item.brand}
          </Typography>
          {item.status !== "assigned" ? (
            <div>
              <Typography variant="body2">
                <strong>Registrada por: </strong>
                {item.firstName} {item.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>Dirección:</strong> {item.address}, {item.number}
              </Typography>
              <Typography variant="body2">
                <strong>City:</strong> {item.city} - {item.zipcode}
              </Typography>
              <Typography variant="body2">
                <strong>Registrada en:</strong>{" "}
                {new Date(item.registeredAt).toLocaleDateString()}
              </Typography>
            </div>
          ) : (
            <div />
          )}
        </CardContent>
        <CardActions>
          {item.status !== "assigned" ? (
            <Button onClick={onClick}>Abrir</Button>
          ) : (
            <Button onClick={onClick}>Registrar</Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
