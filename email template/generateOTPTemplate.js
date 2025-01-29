// OTP Template function
const generateOTPTemplate = (otp) => {
    // Template string where OTP will be inserted
    const template = `
      <html>
        <head>
          <title>Your OTP</title>
        </head>
        <body>
          <h1>Your One-Time Password (OTP) is:</h1>
          <h2 style="color: blue;">${otp}</h2>
          <p>Please use this OTP to complete your verification process.</p>
        </body>
      </html>
    `;

    return template;
};

export default generateOTPTemplate;
