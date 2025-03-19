import React, { useState, useEffect } from "react";
import {
  IDetectedBarcode,
  Scanner,
  useDevices,
} from "@yudiel/react-qr-scanner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt"; // Camera icon

const QRscanner = ({ callBack }: { callBack: (data: string) => void }) => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [currentCameraIndex, setCurrentCameraIndex] = useState<number>(0); // Track the current camera index
  const devices = useDevices(); // Get the list of available devices

  // Filter for video input devices (cameras)
  const cameras = devices.filter((device) => device.kind === "videoinput");

  // Set the initial camera (default to the second camera if available, likely the main camera on Samsung S22)
  useEffect(() => {
    if (cameras.length > 1 && !selectedDeviceId) {
      setCurrentCameraIndex(1); // Default to the second camera (often the main camera on Samsung devices)
      setSelectedDeviceId(cameras[1].deviceId);
    } else if (cameras.length === 1 && !selectedDeviceId) {
      setCurrentCameraIndex(0);
      setSelectedDeviceId(cameras[0].deviceId);
    }
  }, [cameras, selectedDeviceId]);

  // Handle QR code scan
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const data = detectedCodes[0] || null;
    if (data) {
      setQrData(data.rawValue.toString());
      callBack(data.rawValue.toString());
    }
  };

  // Switch to the next camera in the list
  const handleCameraSwitch = () => {
    if (cameras.length === 0) return; // No cameras to switch

    const nextIndex = (currentCameraIndex + 1) % cameras.length; // Cycle through cameras, loop back to 0 if at the end
    setCurrentCameraIndex(nextIndex);
    setSelectedDeviceId(cameras[nextIndex].deviceId);
  };

  return (
    <Box sx={{ position: "relative" }} className="qrScannerCameraSelector">
      {/* Camera Switch Icon */}
      {cameras.length > 1 && (
        <IconButton
          onClick={handleCameraSwitch}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#ffffff", // Match the purple theme from your previous components
            zIndex: 999,
          }}
          aria-label="Switch camera"
        >
          <CameraAltIcon sx={{ width: 60, height: 60 }} />
        </IconButton>
      )}

      {/* QR Scanner */}
      {selectedDeviceId ? (
        <Box>
          <Scanner
            onScan={handleScan}
            components={{ audio: false }}
            constraints={{
              deviceId: selectedDeviceId, // Use the selected camera
            }}
          />
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No cameras found.
        </Typography>
      )}

      {/* Scan Result */}
      {qrData && (
        <Typography variant="body2" color="textPrimary">
          Scanned Data: {qrData}
        </Typography>
      )}
    </Box>
  );
};

export default QRscanner;
