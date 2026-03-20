import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app: Express = express();

// Trust Caddy proxy
app.set("trust proxy", 1);

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN || "http://localhost:5173",
      "https://todo-serviot.64kbits.com",
      "https://api-todo-serviot.64kbits.com",
    ],
    credentials: true,
  }),
);

// Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      status: "OK",
      message: "Welcome to the Todo App API",
      routes: ["/api", "/api/v1/auth", "/api/v1/todos"],
    });
});

app.get("/api", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Welcome to the Todo App API" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Healthy" });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", todoRoutes);

// Error Handling
app.use(errorHandler);

export default app;
