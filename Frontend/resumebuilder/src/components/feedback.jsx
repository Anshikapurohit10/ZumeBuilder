import React, { useState, useEffect } from "react";
import API from "../api/api"; // your Axios instance
import "./feedback.css";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const res = await API.get("/feedback");
    setFeedbacks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("username", username);
    if (image) formData.append("image", image);

    await API.post("/feedback", formData);
    setText("");
    setImage(null);
    fetchFeedbacks();
    localStorage.setItem("userName", username);

  };

  // 🩵 Like button click
const handleLike = async (id) => {
  const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
  if (likedPosts.includes(id)) return; // already liked

  await API.post(`/feedback/${id}/like`);
  localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, id]));
  fetchFeedbacks();
};

  return (
    <div className="feedback-container">
      <h2>Share Your Feedback</h2>

      <form onSubmit={handleSubmit} className="feedback-form">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="username-input"
        />
        <textarea
          placeholder="Write your feedback..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Post Feedback</button>
      </form>

      <div className="posts">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="post-card">
            <h3>{fb.username}</h3>
            <p>{fb.text}</p>
        {fb.image && <img src={`https://zume-lgu7.onrender.com/${fb.image}`} alt="Feedback" />}
 <p
              className="likes"
              onClick={() => handleLike(fb._id)} // 👈 click to like
              style={{ cursor: "pointer" }}
            >
              ❤️ {fb.likes || 0}
            </p>
           
 
{fb.username === localStorage.getItem("userName") && (
  <button
    onClick={async () => {
      await API.delete(`/feedback/${fb._id}`);
      fetchFeedbacks();
    }}
    className="delete-btn"
  >
    🗑️ Delete
  </button>
)}


          </div>
        ))}
      </div>
    </div>
  );
}
