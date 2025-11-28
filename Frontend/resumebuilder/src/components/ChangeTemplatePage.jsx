import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChangeTemplatePage.css";

const ChangeTemplatePage = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (template) => {
    localStorage.setItem("selectedTemplate", template);
    navigate("/resumebuilder"); // back to main resume preview
  };

  return (
    <div className="template-selection-page">
      <h2>Select a Resume Template</h2>

      <div className="template-list">
        <div
          className="template-card"
          onClick={() => handleTemplateSelect("template1")}
        >
          <img src="src/assets/Screenshot 2025-11-02 144407.png" alt="Template 1" />
          <p>Template 1</p>
        </div>

        <div
          className="template-card"
          onClick={() => handleTemplateSelect("template2")}
        >
          <img src="src/assets/Screenshot 2025-11-11 130416.png" alt="Template 2" />
          <p>Template 2</p>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate("/resumeBuilder")}>
        Back to Resume
      </button>
    </div>
  );
};

export default ChangeTemplatePage;
