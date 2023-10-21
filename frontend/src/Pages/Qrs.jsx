import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const Qrs = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [qrCodeMessage, setQrCodeMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  let html5QrCode; // Define html5QrCode variable outside the useEffect

  useEffect(() => {
    if (isScanning) {
      setIsPopupVisible(true); // Close the popup when starting a new scan

      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            const cameraId = devices[0].id;

            html5QrCode = new Html5Qrcode("reader");

            html5QrCode
              .start(
                cameraId,
                {
                  fps: 30,
                  qrbox: 250,
                },
                (qrCodeMessage) => {
                  setQrCodeMessage(qrCodeMessage);
                  // Handle the QR code message
                  console.log(`QR Code detected: ${qrCodeMessage}`);
                },
                (errorMessage) => {
                  // Handle any errors or messages
                  console.log(`QR Code Error: ${errorMessage}`);
                }
              )
              .catch((err) => {
                // Handle any start scanning errors
                console.log(`Unable to start scanning, error: ${err}`);
              });
          }
        })
        .catch((err) => {
          // Handle any camera retrieval errors
          console.log(`Unable to get cameras, error: ${err}`);
        });
    } else {
      if (html5QrCode) {
        html5QrCode.stop().then(() => {
          console.log('Scanning stopped');
        });
      }
    }

    return () => {
      if (html5QrCode) {
        html5QrCode.clear();
      }
    };
  }, [isScanning]);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className={`bg-white p-4 rounded-md shadow-md ${isScanning ? 'w-72' : 'w-72'}`}>
      <div id="reader" className="mb-4 border border-gray-300 h-96"></div>
      <div className="flex items-center justify-center">
        <button
          className={`px-4 py-2 text-white rounded-md ${isScanning ? 'bg-red-500' : 'bg-green-500'
            }`}
          onClick={() => setIsScanning(!isScanning)}
        >
          {isScanning ? 'Stop Scan' : 'Start Scan'}
        </button>
      </div>

      {isPopupVisible && (
        <div className="bg-white p-4 mt-4 rounded-md shadow-md">
          <p>Scanned Data: {qrCodeMessage}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
            onClick={togglePopup}
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
};

export default Qrs;
