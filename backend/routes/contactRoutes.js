// routes/contactRoutes.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // ✅ Setup transporter (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail", // you can also use "Outlook", "Yahoo", or SMTP
      auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // app password (not your normal password!)
      },
    });

    // ✅ Email details
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER, // who should receive it
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, msg: "Email sent successfully!" });
  } catch (err) {
    console.error("❌ Nodemailer error:", err.message);
    return res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

export default router;
