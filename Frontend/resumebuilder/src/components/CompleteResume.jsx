
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResumePreview from "./ResumePreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./CompleteResume.css";

const CompleteResume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeRef = useRef();

  const formData = location.state?.formData || {};

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;

    // Capture the preview container
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add multiple pages if needed
    while (heightLeft > 0) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      if (heightLeft > 0) {
        pdf.addPage();
        position = -pdfHeight;
      }
    }

    pdf.save("Zume.pdf");
  };
    const handleBack = () => {
    localStorage.setItem("resumeFormData", JSON.stringify(formData));
    navigate("/resumeBuilder");
  };

  return (
    <div className="complete-resume-container">
      {/* Header Bar */}
      <div className="resume-header-top">
         <button className="back-btn" onClick={handleBack}>
          ← Back to Edit
        </button>

        <h1 className="resume-title">Complete Resume Preview</h1>

        <button className="download-btn" onClick={handleDownloadPDF}>
          ⬇️ Download Resume
        </button>
      </div>

      {/* Actual resume preview */}
      <div ref={resumeRef} className="resume-preview-wrapper">
        <ResumePreview formData={formData} />
      </div>
    </div>
  );
};

export default CompleteResume;
