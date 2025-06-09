import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

// Initialize dotenv only once
dotenv.config();

app.use(express.json());

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Parse cookies sent from client
app.use(cookieParser());

import authRoutes from "./routes/authRoutes.mjs";
app.use("/api/auth", authRoutes);

import movieRoutes from "./routes/movieRoutes.mjs";
app.use("/api/movies", movieRoutes);

import libraryRoutes from "./routes/libraryRoutes.mjs";
app.use("/api/library", libraryRoutes);

import reviewRoutes from "./routes/reviewRoutes.mjs";
app.use("/api/reviews", reviewRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Port from env or fallback
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
