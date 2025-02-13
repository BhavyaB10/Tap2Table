import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, phone, type } = req.body;

  // ✅ Validate data
  if (!name || !phone || !type) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "bhavyabinthariya@gmail.com",
      subject: "Mail for Demo/Inquiry - Tap2Table",
      text: `Name: ${name}\nPhone: ${phone}\nType: ${type}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
