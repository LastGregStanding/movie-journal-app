import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
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

import authRoutes from "./routes/authRoutes.mjs";
// import libraryRoutes from "./routes/libraryRoutes.mjs";
// import movieRoutes from "./routes/movieRoutes.mjs";
// import reviewRoutes from "./routes/reviewRoutes.mjs";
// import userRoutes from "./routes/userRoutes.mjs";

app.use("/api/auth", authRoutes);
// app.use("/api/library", libraryRoutes);
// app.use("/api/movies", movieRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Port from env or fallback
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
