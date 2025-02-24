import React, { useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

const QRscanner = ({ callBack }: { callBack: (data: string) => void }) => {
  const [qrData, setQrData] = useState<string | null>(null);

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const data = detectedCodes[0] || null;
    if (data) {
      setQrData(data.rawValue.toString());
      // console.log(data.rawValue.toString());
      callBack(data.rawValue.toString());
    }
  };

  return (
    <div>
      <Scanner onScan={handleScan} components={{ audio: false }} />
      {qrData && <p>Scanned Data: {qrData}</p>}
    </div>
  );
};

export default QRscanner;
