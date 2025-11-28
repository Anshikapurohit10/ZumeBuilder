

import express from "express";
import multer from "multer";
import { analyzeResume, analyzeText } from "../controllers/atsController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("resume"), (req, res) => {
  if (req.file) {
    // PDF Mode
    return analyzeResume(req, res);
  } else {
    // Text Mode
    return analyzeText(req, res);
  }
});

export default router;
