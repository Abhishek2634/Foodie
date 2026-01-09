import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeDownload = () => {
  return (
    <div className="qr-code-download">
      <h3>📲 Scan to Download</h3>
      <QRCodeCanvas
        value="https://play.google.com/store/apps/details?id=com.yourapp"
        size={150} // size in pixels
        bgColor="#ffffff" // background color
        fgColor="#000000" // QR color
        level="H" // error correction level
        includeMargin={true} // adds padding
      />
    </div>
  );
};

export default QRCodeDownload;
