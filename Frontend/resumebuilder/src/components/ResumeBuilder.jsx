// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import ResumePreview from "./ResumePreview";
// import PersonalDetails from "./PersonalDetails";
// import Skills from "./Skills";
// import ProfessionalSummary from "./ProfessionalSummary";
// import Education from "./Education";
// import Experience from "./Experience";
// import Projects from "./Projects";
// import "./ResumeBuilder.css";

// const ResumeBuilder = () => {
//   const [step, setStep] = useState(1);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "",
//     jobTitle: "",
//      skills: [],
//     summary: "",
//     education: [],
//     experience: [],
//     projects: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="resume-builder">
//       <Sidebar step={step} setStep={setStep} />

//       <div className="resume-content">
//         {step === 1 && (
//           <PersonalDetails formData={formData} handleChange={handleChange} />
//         )}

//          {step === 2 && (
//           <ProfessionalSummary formData={formData} handleChange={handleChange} />
//         )}
//         {step === 3 && (
//           <Education formData={formData} handleChange={handleChange} />
//         )}
//         {step === 4 && (
//           <Skills formData={formData} setFormData={setFormData} />
//         )}
//         {step === 5 && (
//           <Experience formData={formData} handleChange={handleChange} />
//         )}
//         {step === 6 && (
//           <Projects formData={formData} handleChange={handleChange} />
//         )}

//       </div>

//       <ResumePreview formData={formData} />
//     </div>
//   );
// };

// export default ResumeBuilder;
import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ResumePreview from "./ResumePreview";
import PersonalDetails from "./PersonalDetails";
import ProfessionalSummary from "./ProfessionalSummary";
import Education from "./Education";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import "./ResumeBuilder.css";

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    jobTitle: "",
    summary: "",
    education: [],
    skills: [],
    experience: [],
    projects: [],
  });

  // update function
  const handleChange = (eOrName, value) => {
    // works for both input events and direct calls
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
      localStorage.removeItem("resumeFormData"); // optional
    }
  }, []);

  return (
    <div className="resume-builder">
      <Sidebar step={step} setStep={setStep} />
      <div className="resume-content">
        {step === 1 && (
          <PersonalDetails formData={formData} handleChange={handleChange} />
        )}
        {step === 2 && (
          <ProfessionalSummary formData={formData} handleChange={handleChange} />
        )}
        {step === 3 && (
          <Education formData={formData} handleChange={handleChange} />
        )}
        {step === 4 && (
          <Skills formData={formData} handleChange={handleChange} />
        )}
        {step === 5 && (
          <Experience formData={formData} handleChange={handleChange} />
        )}
        {step === 6 && (
          <Projects formData={formData} handleChange={handleChange} />
        )}
      </div>
      <ResumePreview formData={formData} />
      <button
        className="view-resume-btn"
        onClick={() => navigate("/complete-resume", { state: { formData } })}
      >
        View Full Resume
      </button>
    </div>
  );
};

export default ResumeBuilder;
