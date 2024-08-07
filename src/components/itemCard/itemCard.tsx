import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { Label } from "@mui/icons-material";
// import IconName from '@mui/icons-material/IconName'

export type ItemCardProps = {
  item: string;
  onClick: () => void;
};

export function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <div>
      <Card elevation={3}>
        <CardHeader title={item.description} subheader={item.sku} />
        <CardContent>
          <Typography variant="body2">{item.garantiaId}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onClick}>Abrir</Button>
        </CardActions>
      </Card>
    </div>
  );
}
