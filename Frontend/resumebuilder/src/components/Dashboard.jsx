import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const [showFieldSelection, setShowFieldSelection] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const fieldSectionRef = useRef(null); // 👈 reference for scrolling

  const handleCreateResume = () => {
    setShowFieldSelection(true);

    // Small delay to ensure element is rendered before scrolling
    setTimeout(() => {
      fieldSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    localStorage.setItem("selectedField", field);
    navigate("/ResumeBuilder");
  };

  const handelCreatePortfolio = () => {
    navigate("/portfolio");
  };

  return (
    
    <>
    
      <Navbar />

      <div className="dashboard-container">
        <header className="dashboard-header">
          <button className="back-button" onClick={() => navigate("/")}> back</button>
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
        <div className="tabs">
          <button className="tab active">Portfolio</button>
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
            + Create resume
          </button>
          <button className="create-btns" onClick={handelCreatePortfolio}>
            + Create portfolio
          </button>
        </div>

        {/* 👇 Field Selection Section */}
        {showFieldSelection && (
          <div className="field-selection" ref={fieldSectionRef}>
            <h3>Select Your Field</h3>
            <div className="field-options">
              {["IT JOBS", "NON-IT JOBS", "SPORTS", "TEACHING", "MEDICAL", "OTHER"].map(
                (field) => (
                  <button
                    key={field}
                    className={`field-btn ${selectedField === field ? "selected" : ""}`}
                    onClick={() => handleFieldSelect(field)}
                  >
                    {field}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
