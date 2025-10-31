import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, default: null },
  likes: { type: Number, default: 0 },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
