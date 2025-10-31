import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedbackSchema);
