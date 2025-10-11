import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Blogs = () => {
      const navigate = useNavigate();
  const [blogs] = useState([
     {
      id: 1,
      image:
        "https://img.freepik.com/premium-vector/graduation-concept_118813-6328.jpg",
      category: "Resume Examples",
      title: " Software developer Resume Templates 2025: Guide",
      description:
        "Imagine this: you've just graduated with your MBA, armed with knowledge, skills, and ambition. You’re ready to conquer the business world...",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/free-vector/flat-design-cover-letter-illustration_23-2149154850.jpg",
      category: "All Articles",
      title: "How to Write a Cover Letter 2025: Tips",
      description:
        "In today’s competitive job market, a standout cover letter can be the key to unlocking your dream job...",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-17863.jpg",
      category: "Resume Help",
      title: "Top Keywords for an IT Resume",
      description:
        "You’ve spent hours perfecting your IT resume summary, highlighting your skills, certifications, and achievements...",
    },
  ]);

  return (
    <div className="blog-page">
      {/* Header */}
      <header className="blog-header">
        <h1>Latest Articles</h1>
       <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      </header>

      {/* Blog Grid */}
      <div className="blog-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <p className="blog-category">{blog.category}</p>
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-description">{blog.description}</p>
              <button className="read-more">READ MORE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
