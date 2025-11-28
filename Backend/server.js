
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

// Import DB and routes
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";

// Load env
dotenv.config();

// Connect to MongoDB
connectDB();

// Express app
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Multer upload setup
const upload = multer({ dest: "uploads/" });

// File paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/ats", atsRoutes);

// Sample role keywords
const ROLE_KEYWORDS = {
  "web developer": ["JavaScript", "React", "Node.js", "HTML", "CSS", "API", "MongoDB"],
  "frontend developer": ["React", "JavaScript", "UI", "Tailwind", "CSS"],
  "backend developer": ["Node.js", "Express", "MongoDB", "API", "SQL"],
};

// ---------------------- 1) UPLOAD RESUME -------------------------
app.post("/api/ats/upload-resume", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Resume file required" });

  const filePath = req.file.path;

  try {
    // Prepare multipart for Affinda
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const affindaRes = await axios.post("https://api.affinda.com/v2/resumes", form, {
      headers: {
        Authorization: `Bearer ${process.env.AFFINDA_API_KEY}`,
        ...form.getHeaders(),
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    // Parsed resume data
    const parsed = affindaRes.data;
    return res.json({ success: true, parsed });
  } catch (err) {
    console.error("Affinda error:", err?.response?.data || err.message || err);

    // Fallback: local PDF parsing
    try {
      const buffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(buffer);
      return res.json({ success: true, text: pdfData.text });
    } catch (err2) {
      console.error("Local PDF parse failed:", err2.message);
      return res.status(500).json({ success: false, message: "Parsing failed", details: err2.message });
    }
  } finally {
    // Clean up uploaded file
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
});

// ---------------------- 2) ATS ANALYZE -------------------------
app.post("/api/ats/analyze", (req, res) => {
  const { resumeText, role, jdText } = req.body;
  if (!resumeText) return res.status(400).json({ error: "Resume text missing" });

  let keywords = [];
  if (jdText) {
    keywords = jdText.split(/[\s,.\n]/).filter((w) => w.length > 4).slice(0, 30);
  } else if (role) {
    keywords = ROLE_KEYWORDS[role.toLowerCase()] || [];
  }

  const resumeLower = resumeText.toLowerCase();
  const matched = keywords.filter((k) => resumeLower.includes(k.toLowerCase()));
  const missing = keywords.filter((k) => !resumeLower.includes(k.toLowerCase()));
  const score = keywords.length > 0 ? Math.floor((matched.length / keywords.length) * 100) : 0;

  res.json({
    score,
    matched,
    missing,
    totalKeywords: keywords.length,
    suggestions: missing.map((m) => `${m} keyword missing in resume.`),
  });
});

// ---------------------- 3) AI REWRITE -------------------------
app.post("/api/ats/rewrite", async (req, res) => {
  try {
    const { resumeText, jdText } = req.body;

    const prompt = `
Rewrite the following resume content to match this job description. 
Add missing keywords naturally but keep it simple, clean and ATS-friendly.

Job Description:
${jdText}

Resume:
${resumeText}

Output only improved bullet points.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    res.json({ suggestions: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root test
app.get("/", (req, res) => res.send("Backend running + ATS active 🚀"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (ATS enabled)`));


