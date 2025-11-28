
import { extractTextFromPDF } from "../utils/pdfReader.js";
import { analyzeATS } from "../utils/ATSAnalyzer.js";

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const resumeText = await extractTextFromPDF(req.file.path);
    const result = analyzeATS(resumeText);

    res.json({
      text: resumeText,
      score: result.totalScore,
      matched: result.sections.tech.matched,
      missing: result.sections.tech.missing,
      suggestions: result.suggestions,
    });
  } catch (err) {
    console.error("ATS analyze error:", err);
    res.status(500).json({ msg: "Failed to process resume" });
  }
};

// -----------------------------------
// 2) TEXT MODE
// -----------------------------------
export const analyzeText = async (req, res) => {
  try {
    const { resumeText, jdText, role } = req.body;

    if (!resumeText)
      return res.status(400).json({ msg: "resumeText is required" });

    const result = analyzeATS(resumeText, role, jdText);

    res.json({
      text: resumeText,
      score: result.totalScore,
      matched: result.sections.tech.matched,
      missing: result.sections.tech.missing,
      suggestions: result.suggestions,
    });
  } catch (err) {
    console.error("TEXT ATS error:", err);
    res.status(500).json({ msg: "ATS text analysis failed" });
  }
};
