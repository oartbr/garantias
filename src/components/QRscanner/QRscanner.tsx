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
  const streamRef = useRef<MediaStream | null>(null);

  const cameras = devices.filter((device) => device.kind === "videoinput");

  // Log browser and device info for debugging
  useEffect(() => {
    console.log("Browser Info:", navigator.userAgent);
    console.log("Navigator.mediaDevices available:", !!navigator.mediaDevices);
    console.log("Available cameras:", cameras);
  }, [cameras]);

  // Request camera permissions
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error(
            "Media devices not supported in this browser. Ensure the app is running over HTTPS."
          );
        }
        console.log("Requesting camera permissions...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Prefer rear camera
        });
        streamRef.current = stream;
        console.log(
          "Camera permissions granted. Stream active:",
          stream.active
        );
        console.log("Stream tracks:", stream.getTracks());
        setPermissionGranted(true);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Failed to access camera: ${error.name} - ${error.message}`);
        } else {
          setError("Failed to access camera: Unknown error");
        }
        console.error("Error requesting camera permissions:", error);
      }
    };

    requestCameraPermission();

    return () => {
      if (streamRef.current) {
        console.log("Cleaning up camera stream...");
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Set the initial camera after permissions are granted
  useEffect(() => {
    if (permissionGranted && cameras.length > 0 && !selectedDeviceId) {
      const initialIndex = cameras.length > 1 ? 1 : 0;
      console.log(
        `Setting initial camera: ${cameras[initialIndex].label || cameras[initialIndex].deviceId}`
      );
      setCurrentCameraIndex(initialIndex);
      setSelectedDeviceId(cameras[initialIndex].deviceId);
    }
  }, [cameras, selectedDeviceId, permissionGranted]);

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const data = detectedCodes[0] || null;
    if (data) {
      setQrData(data.rawValue.toString());
      callBack(data.rawValue.toString());
      console.log("Scanned QR code:", data.rawValue.toString());
    }
  };

  const handleCameraSwitch = () => {
    if (cameras.length <= 1) return;

    const nextIndex = (currentCameraIndex + 1) % cameras.length;
    console.log(
      `Switching to camera: ${cameras[nextIndex].label || cameras[nextIndex].deviceId}`
    );
    setCurrentCameraIndex(nextIndex);
    setSelectedDeviceId(cameras[nextIndex].deviceId);

    // Stop the current stream to ensure the new camera is used
    if (streamRef.current) {
      console.log("Stopping current stream before switching...");
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
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
            zIndex: 10001,
          }}
          aria-label="Switch camera"
        >
          <CameraAltIcon sx={{ height: 60, width: 60 }} />
        </IconButton>
      )}

      {selectedDeviceId ? (
        <Box>
          <Scanner
            key={selectedDeviceId} // Force remount when deviceId changes
            onScan={handleScan}
            components={{ audio: false }}
            constraints={{
              deviceId: selectedDeviceId,
            }}
            onError={(error) => {
              if (error instanceof Error) {
                console.error("Scanner error:", error);
                setError(`Scanner error: ${error.name} - ${error.message}`);
              }
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
