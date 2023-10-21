import React from "react";
import QRCode from "qrcode.react"; // For generating QR codes
import { BrowserRouter as Link } from "react-router-dom";
import { useParams } from "react-router";

const Qrs = () => {
  // Retrieve the transaction hash from the URL using React Router
  const { transactionHash } = useParams();

  // Other ticket details
  const ticketDetails = {
    // Add your ticket details here
  };

  return (
    <div>
      {/* Display the ticket details */}
      <h1>Ticket Details</h1>
      <p>Transaction Hash: {transactionHash}</p>
      {/* Display other ticket details here */}
      {/* Generate and display the QR code with the transaction hash */}
      <QRCode value={transactionHash} />

      <Link to="/events">Go Back</Link>
    </div>
  );
};

export default Qrs;
