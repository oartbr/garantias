// import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/es";
import IconButton from "@mui/material/IconButton";
import PlayCircle from "@mui/icons-material/PlayCircle";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
// import Avatar from "@mui/material/Avatar";
import CardActionArea from "@mui/material/CardActionArea";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import { Label } from "@mui/icons-material";
// import IconName from '@mui/icons-material/IconName'

export type Media = {
  url: string;
  createdAt?: string;
  updatedAt?: string;
  status: string;
  quantity?: number;
};

export type MediaCardProps = {
  title: String;
  description?: String;
  onClick?: () => void;
  action: string;
  pdf?: string;
  url?: string;
  target?: string;
};

export default function MediaCard({
  title,
  description,
  onClick,
  action = "",
  pdf = "",
  url = "",
  target = "",
}: MediaCardProps) {
  return (
    <div>
      <Card sx={{ maxWidth: 285 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {pdf !== "" && (
            <IconButton
              aria-label={action}
              href={pdf}
              target={target}
              onClick={onClick}
            >
              <PictureAsPdf sx={{ color: "white" }} />
            </IconButton>
          )}
          {url !== "" && (
            <IconButton href={url} target={target} onClick={onClick}>
              <PlayCircle sx={{ color: "red" }} />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
