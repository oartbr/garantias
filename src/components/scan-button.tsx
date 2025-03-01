"use client";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";

const ScanButton = () => {
  return (
    <IconButton
      disableRipple
      onClick={() => {
        window.location.href = "/scan";
      }}
      color="inherit"
    >
      <PhotoCamera sx={{ width: 35, height: 35 }} />
    </IconButton>
  );
};

export default ScanButton;
