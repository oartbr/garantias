import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import appIcon from "../../../public/assets/images/logo.WSE.short.normal.svg";
import { useTranslation } from "@/services/i18n/client";
import { LOGO } from "@/components/theme/themes";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isShowPrompt, setShowPrompt] = useState(true);

  const { t } = useTranslation("common");

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      const promptEvent = event as BeforeInstallPromptEvent;
      promptEvent.preventDefault();
      setDeferredPrompt(promptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("User choice:", outcome);
      setDeferredPrompt(null);
      setIsVisible(false);
      setShowPrompt(false);
    } else {
      console.error("Install prompt not available.");
    }
  };

  const handleCancelClick = async () => {
    if (deferredPrompt) {
      setDeferredPrompt(null);
      setIsVisible(false);
      setShowPrompt(false);
    } else {
      console.error("Install prompt not available.");
    }
  };
  // console.log({ LOGO });
  return isVisible && isShowPrompt ? (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="installPrompt"
    >
      {/* App Icon */}
      <CardMedia
        component="img"
        image={LOGO}
        alt="Install Garantias App"
        sx={{
          width: 172,
          height: 60,
          borderRadius: "2px",
        }}
      />

      {/* Message */}
      <CardContent sx={{ textAlign: "center", padding: 0 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {t("common:install.prompt")}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t("common:install.message")}
        </Typography>
      </CardContent>

      {/* Install Button */}
      <Box className="installPromptActions">
        <Button
          variant="contained"
          onClick={handleCancelClick}
          sx={{
            backgroundColor: "#cccccc", // Blue button like in the screenshot
            color: "#fff",
            borderRadius: 2,
            textTransform: "uppercase",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#0056b3", // Darker blue on hover
            },
          }}
        >
          {t("common:install.cancel")}
        </Button>
        <Button
          variant="contained"
          onClick={handleInstallClick}
          sx={{
            backgroundColor: "#007bff", // Blue button like in the screenshot
            color: "#fff",
            borderRadius: 2,
            textTransform: "uppercase",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#0056b3", // Darker blue on hover
            },
          }}
        >
          {t("common:install.button")}
        </Button>
      </Box>
    </Card>
  ) : null;
}
