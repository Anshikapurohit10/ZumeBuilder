
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import PersonalDetails from "./PersonalDetails";
import ProfessionalSummary from "./ProfessionalSummary";
import Education from "./Education";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import Reference from "./Reference";
import Projects from "./Projects";
import ResumeTemplate1 from "./ResumePreview";
import ResumeTemplate2 from "./ResumeTemplate2";
import "./ResumeBuilder.css";
// import Celebration from "./Celebration";
const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const [selectedTemplate] = useState(
    localStorage.getItem("selectedTemplate") || "template1"
  );
const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    personalDetails: {},
    professionalSummary: "",
    education: [],
    skills: [],
    experience: [],
    projects: [],
    certificates: [],
    reference: [],
  });

  const navigate = useNavigate();

  const selectedField = localStorage.getItem("selectedField") || "OTHER";
  console.log("Selected Field:", selectedField);

  const fieldSections = {
    "IT JOBS": [
      "PersonalDetails",
      "ProfessionalSummary",
      "Education",
      "Skills",
      "Experience",
      "Projects",
      "Certificates",
    ],
    "NON-IT JOBS": [
      "PersonalDetails",
      "ProfessionalSummary",
      "Education",
      "Skills",
      "Experience",
      "Certificates",
      "Reference",
    ],
    "SPORTS": [
      "PersonalDetails",
      "ProfessionalSummary",
      "Education",
      "Certificates",
      "Experience",
      "Reference",
    ],
    "TEACHING": [
      "PersonalDetails",
      "ProfessionalSummary",
      "Education",
      "Certificates",
      "Reference",
    ],
    "MEDICAL": [
      "PersonalDetails",
      "ProfessionalSummary",
      "Education",
      "Certificates",
      "Experience",
      "Reference",
    ],
    "OTHER": [
      "PersonalDetails",
      "ProfessionalSummary",
      "Education",
      "Skills",
      "Experience",
      "Projects",
      "Certificates",
      "Reference",
    ],
  };

  const activeSections = fieldSections[selectedField];

  const handleChange = (eOrName, value) => {
    if (eOrName?.target) {
      const { name, value } = eOrName.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (typeof eOrName === "string") {
      setFormData((prev) => ({ ...prev, [eOrName]: value }));
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("resumeFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      localStorage.removeItem("resumeFormData");
    }
  }, []);

  const renderStep = () => {
    const section = activeSections[step - 1];
    switch (section) {
      case "PersonalDetails":
        return <PersonalDetails formData={formData} handleChange={handleChange} />;
      case "ProfessionalSummary":
        return <ProfessionalSummary formData={formData} handleChange={handleChange} />;
      case "Education":
        return <Education formData={formData} handleChange={handleChange} />;
      case "Skills":
        return <Skills formData={formData} handleChange={handleChange} />;
      case "Experience":
        return <Experience formData={formData} handleChange={handleChange} />;
      case "Projects":
        return <Projects formData={formData} handleChange={handleChange} />;
      case "Certificates":
        return <Certificate formData={formData} handleChange={handleChange} />;
      case "Reference":
        return <Reference formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="resume-builder">
      <Sidebar step={step} setStep={setStep} activeSections={activeSections} />

      <div className="resume-content">{renderStep()}</div>

      <div className="resume-preview-container">
        {selectedTemplate === "template1" && <ResumeTemplate1 formData={formData} />}
        {selectedTemplate === "template2" && <ResumeTemplate2 formData={formData} />}

       <button
  onClick={() => {
    localStorage.setItem("resumeFormData", JSON.stringify(formData));
    navigate("/change-template");
  }}
  className="change-template-btn"
>
  Change Template
</button>
<button
  className="view-resume-btn"
  onClick={() => {
    setShowConfetti(true); // show confetti
    setTimeout(() => {
      localStorage.setItem("resumeFormData", JSON.stringify(formData));
      navigate("/complete-resume", {
        state: { formData, selectedTemplate },
      });
    }, 2000); // 2 seconds to enjoy confetti
  }}
>
  View Full Resume
</button>

<Celebration show={showConfetti} />


        
      </div>
      
    </div>
  );
};

export default ResumeBuilder;

