import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

app.use(
  cors({
    origin: "*",
    methods: ["POST"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/send/mail", async (req, res) => {
  console.log("📩 /send/mail hit");
  console.log("Body:", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.error("❌ Missing fields");
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    console.log("🚀 Sending email...");

    await sendEmail({
      email: "pk2362002@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });

    console.log("✅ Email sent");

    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    console.error("🔥 Email error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
});

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
