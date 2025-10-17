import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function testMail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ Server is ready to take messages");
  } catch (err) {
    console.error("❌ Nodemailer error:", err.message);
  }
}

testMail();
