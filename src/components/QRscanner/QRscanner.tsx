import React, { useState, useEffect, useCallback } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

const QRscanner = ({ callBack }: { callBack: (data: string) => void }) => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getDevices = async () => {
      try {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = mediaDevices.filter(
          (device) => device.kind === "videoinput"
        );
        console.log("Available video devices:", videoDevices);

        if (mounted && videoDevices.length > 0) {
          setDevices(videoDevices);

          // Get saved camera preference
          const savedDeviceId = localStorage.getItem("preferredCameraId");

          // Check if saved device exists in current devices
          const savedDeviceExists =
            savedDeviceId &&
            videoDevices.some((device) => device.deviceId === savedDeviceId);

          if (!currentDeviceId) {
            const initialDeviceId = savedDeviceExists
              ? savedDeviceId
              : videoDevices[0].deviceId;

            setCurrentDeviceId(initialDeviceId);
            console.log("Initial device set to:", initialDeviceId);
          }
        }
      } catch (error) {
        console.error("Error getting devices:", error);
      }
    };

    getDevices();
    return () => {
      mounted = false;
    };
  }, []); // Empty array since we only want this to run once

  const handleScan = useCallback(
    (detectedCodes: IDetectedBarcode[]) => {
      const data = detectedCodes[0] || null;
      if (data) {
        setQrData(data.rawValue.toString());
        callBack(data.rawValue.toString());
      }
    },
    [callBack]
  );

  const switchCamera = useCallback(() => {
    if (devices.length <= 1 || isSwitching) {
      console.log("Switch prevented: not enough devices or already switching");
      return;
    }

    setIsSwitching(true);
    const currentIndex = devices.findIndex(
      (device) => device.deviceId === currentDeviceId
    );
    const nextIndex = (currentIndex + 1) % devices.length;
    const nextDeviceId = devices[nextIndex].deviceId;

    console.log("Switching from:", currentDeviceId, "to:", nextDeviceId);
    setCurrentDeviceId(nextDeviceId);

    // Save the selected camera to localStorage
    localStorage.setItem("preferredCameraId", nextDeviceId);

    setTimeout(() => {
      setIsSwitching(false);
      console.log("Switching complete");
    }, 500);
  }, [devices, currentDeviceId, isSwitching]);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "none",
  };

  const scannerStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
  };

  const buttonStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "white",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    opacity: isSwitching ? 0.5 : 1,
    pointerEvents: isSwitching ? "none" : "auto",
  };

  return (
    <div style={containerStyle}>
      {currentDeviceId ? (
        <Scanner
          onScan={handleScan}
          components={{ audio: false }}
          constraints={{
            deviceId: currentDeviceId ? { exact: currentDeviceId } : undefined,
          }}
          styles={{ container: scannerStyle }}
        />
      ) : (
        <p>Loading camera...</p>
      )}
      {devices.length > 1 && (
        <button
          onClick={switchCamera}
          style={buttonStyle}
          title="Switch Camera"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      )}
      {qrData && <p>{qrData}</p>}
    </div>
  );
};

export default QRscanner;
