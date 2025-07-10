module.exports = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Hello!</h2>
      <p style="color: #555;">Your One-Time Password (OTP) for verification is:</p>
      <div style="font-size: 28px; font-weight: bold; color: #007bff; margin: 20px 0;">${otp}</div>
      <p style="color: #555;">This OTP is valid for <strong>2 minutes</strong>. Do not share it with anyone.</p>
      <p style="color: #555;">If you did not request this, please ignore this email.</p>
      <p style="color: #555;">Best regards,<br> The PrepDSA Team</p>
    </div>
  `;
};
