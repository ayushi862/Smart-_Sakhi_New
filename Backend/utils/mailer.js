
import nodemailer from "nodemailer";

export async function sendOTPEmail(email, otp, purpose = "verify") {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    throw new Error("EMAIL_USER and EMAIL_PASS must be configured in .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  const isReset = purpose === "reset";

  await transporter.sendMail({
    from: `"Smart Sakhi" <${emailUser}>`,
    to: email,
    subject: isReset
      ? "Smart Sakhi - Password Reset OTP"
      : "Smart Sakhi - Email Verification OTP",
    text: `Your Smart Sakhi OTP is ${otp}. It expires in 5 minutes. Do not share it with anyone.`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#FFF9F4;padding:30px;color:#304632">
        <div style="max-width:480px;margin:auto;background:white;padding:28px;border-radius:16px">
          <h2>🌿 Smart Sakhi</h2>
          <h3>${isReset ? "Reset Your Password" : "Verify Your Email"}</h3>
          <p>Your one-time password is:</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#47764B;padding:16px 0">${otp}</div>
          <p>This code expires in 5 minutes. Never share it with anyone.</p>
          <p>If you did not request this, ignore this email.</p>
        </div>
      </div>
    `
  });
}
