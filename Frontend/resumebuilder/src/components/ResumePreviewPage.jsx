import React, { useState } from "react";
import ResumeTemplate1 from "./ResumePreview";
import ResumeTemplate2 from "./ResumeTemplate2";
import "./ResumePreviewPage.css";

export default function ResumePreviewPage({ formData }) {
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleTemplateChange = (templateName) => {
    setSelectedTemplate(templateName);
    setShowTemplateModal(false);
  };

  return (
    <div className="resume-preview-page">
      {/* ===== Resume Preview Area ===== */}
      <div className="preview-area">
        {selectedTemplate === "template1" && <ResumeTemplate1 formData={formData} />}
        {selectedTemplate === "template2" && <ResumeTemplate2 formData={formData} />}
      </div>

      {/* ===== Change Template Button ===== */}
      <div className="template-btn-container">
        <button
          onClick={() => setShowTemplateModal(true)}
          className="change-template-btn"
        >
          Change Template
        </button>
      </div>

      {/* ===== Modal for Template Selection ===== */}
      {showTemplateModal && (
        <div className="template-modal">
          <div className="template-modal-content">
            <h3>Select a Template</h3>
            <div className="template-options">
              <div
                className="template-card"
                onClick={() => handleTemplateChange("template1")}
              >
                <img src="/templates/template1-preview.png" alt="Template 1" />
                <p>Template 1</p>
              </div>

              <div
                className="template-card"
                onClick={() => handleTemplateChange("template2")}
              >
                <img src="/templates/template2-preview.png" alt="Template 2" />
                <p>Template 2</p>
              </div>
            </div>

            <button
              className="close-modal-btn"
              onClick={() => setShowTemplateModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
