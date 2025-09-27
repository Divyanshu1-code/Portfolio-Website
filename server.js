import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API endpoint for contact form
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(500).json({ message: "Failed to send email" });
    res.json({ message: "Message sent successfully!" });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
