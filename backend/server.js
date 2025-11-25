
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import oppRoutes from "./routes/opportunities.js";
import recommroute from "./routes/recommend.js"
import matchRoutes from "./routes/match.js";
import resumeRoutes from "./routes/resume.js";
import testRoutes from "./routes/test.js";
import jobRoutes from "./routes/job.js";






dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://career-recommender-platform-ez29.vercel.app"
  ],
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", testRoutes);

app.use("/api/user", userRoutes);
app.use("/api/opportunities", oppRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/recommend",recommroute);



const PORT = process.env.PORT;
connectDB().then(() => app.listen(PORT, ()=> console.log("API running on", PORT)));
