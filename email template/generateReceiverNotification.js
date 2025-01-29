const generateReceiverTemplate = (data) => {

  const { receiver, amount } = data

  const { name, email, number, address, country, uniqueReceiverId } = receiver;

  // Return the HTML template as a string
  return `
      <html>
        <head>
          <title>Payment Received Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #4CAF50;
            }
            p {
              color: #555;
            }
            .footer {
              margin-top: 20px;
              font-size: 0.9em;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Payment Received</h1>
            <p>Hello <strong>${name}</strong>,</p>
            <p>We are pleased to inform you that the payment has been successfully received and credited to your account.</p>
            <h3>Details:</h3>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Contact Number:</strong> ${number}</li>
              <li><strong>Address:</strong> ${address}</li>
              <li><strong>Country:</strong> ${country}</li>
              <li><strong>Unique ID:</strong> ${uniqueReceiverId}</li>
              <li><strong>Amount ID:</strong> ${amount}</li>
            </ul>
            <p>If you have any questions or concerns, feel free to contact our support team.</p>
            <div class="footer">
              <p>Thank you for using our service.</p>
              <p>- The Team</p>
            </div>
          </div>
        </body>
      </html>
    `;
};

export default generateReceiverTemplate;
