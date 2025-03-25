import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useTranslation } from "@/services/i18n/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/es";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";
import Avatar from "@mui/material/Avatar";
// import { Label } from "@mui/icons-material";
// import IconName from '@mui/icons-material/IconName'

export type Pdf = {
  url: string;
  createdAt?: string;
  updatedAt?: string;
  status: string;
  quantity?: number;
};

export type PdfCardProps = {
  item: Pdf;
  onClick: () => void;
  action: string;
};

export default function PdfCard({ item, onClick, action }: PdfCardProps) {
  // console.log({ item });
  const { t } = useTranslation("print");

  return (
    <div>
      <Card elevation={3} className="normalCard">
        <CardHeader
          title={item.quantity + `${t("print:pendingFiles")}`}
          subheader={`${t("print:pdfCard.createdAt")} ${dayjs(item.createdAt).locale("es").fromNow()}`}
          avatar={
            <Avatar
              sx={{
                bgcolor:
                  dayjs().diff(dayjs(item.createdAt), "minute") > 5
                    ? "teal"
                    : "#6c3",
              }}
              aria-label={`${t("print:status." + item.status + ".label")} desde ${dayjs(item.updatedAt).locale("es")}`}
            >
              PDF
            </Avatar>
          }
        />
        <CardContent>
          <Typography variant="body2">
            <strong>{`${t("print:pdfCard.url")}:`}</strong> {item.url}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label={t(`print.${action}`)} onClick={onClick}>
            <PrintIcon sx={{ color: "gray" }} />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
