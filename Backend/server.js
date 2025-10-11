// import express from "express";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import cors from "cors";

// const app = express();
// app.use(express.json());
// app.use(cors());

// connectDB();

// app.use("/api/auth", authRoutes);

// app.listen(5000, () => console.log("Server running on port 5000"));
// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
