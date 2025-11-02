import React from "react";
import "./Sidebar.css";

const Sidebar = ({ step, setStep }) => {
  const steps = [
    "Personal Details",
    "Professional Summary",
    "Education",
    "Skills",
    "Experience",
    "Projects",
    "Certificates",
      "References"
  ];

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        {steps.map((label, index) => (
          <li
            key={index}
            className={step === index + 1 ? "active" : ""}
            onClick={() => setStep(index + 1)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
