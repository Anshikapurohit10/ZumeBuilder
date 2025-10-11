import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "./Navbar";
const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User"; // 👈 name from signup/login

  const handleCreateResume = () => {
    navigate("/ResumeBuilder"); // 👈 route to your resume page
  };

  return (
     <>
      <Navbar />
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>
          Hello <span className="username">{userName}!</span>
        </h2>
        <p className="subtitle">
          Are you ready to create job-ready resumes and cover letters that get noticed by recruiters?
        </p>
      </header>

      <div className="tabs">
        <button className="tab active">Resume</button>
      
      </div>

      <div className="content">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7019/7019688.png"
          alt="Resume Illustration"
          className="resume-image"
        />
        <p className="description">
          Custom-built, amazing resumes. Empower your job search in just a few clicks!
        </p>
        <button className="create-btn" onClick={handleCreateResume}>
          + Create New
        </button>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
