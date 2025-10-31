import express from "express";
import multer from "multer";
import Feedback from "../models/feedback.js";

const router = express.Router();

// ✅ Store uploaded files in "uploads" folder
const upload = multer({ dest: "uploads/" });

// ✅ Get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ _id: -1 }); // latest first
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
});

// ✅ Post feedback (with username + image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { username, text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // ✅ Save feedback with username
    const feedback = new Feedback({
      username,
      text,
      image,
      likes: 0,
    });

    await feedback.save();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error saving feedback", error });
  }
});

// ✅ Like a feedback
router.post("/:id/like", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ msg: "Post not found" });

    feedback.likes += 1;
    await feedback.save();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
});

// ✅ Delete feedback
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ msg: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error });
  }
});

export default router;
