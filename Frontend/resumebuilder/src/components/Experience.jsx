import React, { useState } from "react";
import "./Experience.css";

const Experience = ({ formData, handleChange }) => {
  const [experienceList, setExperienceList] = useState(
    formData.experience.length > 0
      ? formData.experience
      : []
  );

  const [tempExp, setTempExp] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
  });

  const handleTempChange = (e) => {
    const { name, value } = e.target;
    setTempExp({ ...tempExp, [name]: value });
  };

  const addExperience = () => {
    // Only add if title/company is not empty
    if (tempExp.title.trim() === "" || tempExp.company.trim() === "") {
      alert("Please enter at least Job Title and Company Name.");
      return;
    }

    const updated = [...experienceList, tempExp];
    setExperienceList(updated);
    handleChange("experience", updated); // update ResumePreview

    // Reset temp input
    setTempExp({ title: "", company: "", duration: "", description: "" });
  };

  const removeExperience = (index) => {
    const updated = experienceList.filter((_, i) => i !== index);
    setExperienceList(updated);
    handleChange("experience", updated); // update ResumePreview
  };

  return (
    <div className="experience-section">
      <h2>Work Experience</h2>
      <p className="experience-subtitle">
        Add up to 3 work experiences below.
      </p>

      {/* Existing Experiences */}
      {experienceList.map((exp, index) => (
        <div key={index} className="experience-card">
          <strong>{exp.title} — {exp.company}</strong>
          <br />
          {exp.duration && <span>{exp.duration}</span>}
          <p>{exp.description}</p>
          <button onClick={() => removeExperience(index)}>Remove</button>
        </div>
      ))}

      {/* Temp Input for New Experience */}
      {experienceList.length < 3 && (
        <div className="experience-card">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={tempExp.title}
            onChange={handleTempChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={tempExp.company}
            onChange={handleTempChange}
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., Jan 2022 - Dec 2024)"
            value={tempExp.duration}
            onChange={handleTempChange}
          />
          <textarea
            name="description"
            placeholder="Describe your role and key responsibilities..."
            value={tempExp.description}
            onChange={handleTempChange}
          />
          <button className="add-more-btn" onClick={addExperience}>
            + Add Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default Experience;
