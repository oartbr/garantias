import React, { useState, useEffect, useRef } from "react";
import {
  IDetectedBarcode,
  Scanner,
  useDevices,
} from "@yudiel/react-qr-scanner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const QRscanner = ({ callBack }: { callBack: (data: string) => void }) => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [currentCameraIndex, setCurrentCameraIndex] = useState<number>(0);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const devices = useDevices();
  const streamRef = useRef<MediaStream | null>(null); // Store the camera stream

  const cameras = devices.filter((device) => device.kind === "videoinput");

  // Request camera permissions and store the stream
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("Media devices not supported in this context.");
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream; // Store the stream for cleanup
        setPermissionGranted(true);
      } catch (err) {
        setError(
          "Camera access denied or unavailable. Please grant camera permissions."
        );
        console.error("Error requesting camera permissions:", err);
      }
    };

    requestCameraPermission();

    // Cleanup: Stop the camera stream when the component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Set the initial camera after permissions are granted
  useEffect(() => {
    if (permissionGranted && cameras.length > 1 && !selectedDeviceId) {
      setCurrentCameraIndex(1);
      setSelectedDeviceId(cameras[1].deviceId);
    } else if (permissionGranted && cameras.length === 1 && !selectedDeviceId) {
      setCurrentCameraIndex(0);
      setSelectedDeviceId(cameras[0].deviceId);
    }
  }, [cameras, selectedDeviceId, permissionGranted]);

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const data = detectedCodes[0] || null;
    if (data) {
      setQrData(data.rawValue.toString());
      callBack(data.rawValue.toString());
    }
  };

  const handleCameraSwitch = () => {
    if (cameras.length === 0) return;

    const nextIndex = (currentCameraIndex + 1) % cameras.length;
    setCurrentCameraIndex(nextIndex);
    setSelectedDeviceId(cameras[nextIndex].deviceId);
  };

  if (error) {
    return (
      <Box>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!permissionGranted) {
    return (
      <Box>
        <Typography variant="body2" color="textSecondary">
          Requesting camera permissions...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      {cameras.length > 1 && (
        <IconButton
          onClick={handleCameraSwitch}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#ffffff",
            zIndex: 999,
          }}
          aria-label="Switch camera"
        >
          <CameraAltIcon sx={{ height: 48, width: 48 }} />
        </IconButton>
      )}

      {selectedDeviceId ? (
        <Box>
          <Scanner
            onScan={handleScan}
            components={{ audio: false }}
            constraints={{
              deviceId: selectedDeviceId,
            }}
          />
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No cameras found.
        </Typography>
      )}

      {qrData && (
        <Typography variant="body2" color="textPrimary">
          Scanned Data: {qrData}
        </Typography>
      )}
    </Box>
  );
};

export default QRscanner;
