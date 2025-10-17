import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import policyRoutes from "./routes/policyRoutes.js";
import cron from "node-cron";
import Policy from "./models/policy.js";
import User from "./models/user.js";
import { sendEmail} from "./config/email.js"

import authRoutes from "./routes/authRoutes.js";
import extractRoutes from "./routes/extractRoutes.js";




connectDB();

const app = express();
app.use(
  cors({
    origin: ["https://insuraai.vercel.app"], // your live frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/extractRoutes", extractRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("InsuraAI API is running 🚀"));

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("⏳ Running daily policy jobs...");
    const now = new Date();

    // 1️⃣ Expire old policies
    const expiredPolicies = await Policy.updateMany(
      { endDate: { $lt: now }, status: "active" },
      { $set: { status: "expired" } }
    );
    console.log(`✅ Expired policies: ${expiredPolicies.modifiedCount}`);

    // 2️⃣ Send renewal reminders
    const reminders = await Policy.find({
      renewalDueDate: { $lte: now },
      status: "active",
    }).populate("createdBy", "email name");

    for (const policy of reminders) {
      if (policy.createdBy?.email) {
        await sendEmail(
          policy.createdBy.email,
          "Policy Renewal Reminder",
          `
            <h2>Hello ${policy.createdBy.name || "User"},</h2>
            <p>Your policy <b>${policy.policyNumber}</b> (${policy.type}) is due for renewal.</p>
            <p>Please renew before <b>${policy.endDate.toDateString()}</b> to avoid expiry.</p>
            <br/>
            <p>– InsuraAI Team</p>
          `
        );
      }
    }
    console.log(`🔔 Renewal reminders sent: ${reminders.length}`);
  } catch (err) {
    console.error("❌ Cron job error:", err.message);
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
