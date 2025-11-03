import React, { useState } from "react";
import "./Experience.css";

const Experience = ({ formData, handleChange }) => {
  const [experienceList, setExperienceList] = useState(
    formData.experience.length > 0 ? formData.experience : []
  );

  const [tempExp, setTempExp] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
  });

  const [experienceLevel, setExperienceLevel] = useState("");
  
  // Advice messages for each level
  const experienceAdvice = {
  "Fresher": {
    pages: "1 Page Resume",
    tips: [
      "Start with a strong career objective that reflects enthusiasm and learning attitude.",
      "Focus on academic projects, internships, and certifications — they’re your real experience right now.",
      "Highlight your technical and soft skills clearly (e.g., teamwork, communication).",
      "Add a section for achievements or extracurricular activities to show initiative.",
      "Avoid long descriptions — keep it short and focused on outcomes."
    ]
  },
  "1-3 Years": {
    pages: "1 to 1.5 Pages Resume",
    tips: [
      "Start with a concise professional summary — mention your key technologies and achievements.",
      "Focus on recent job/internship experiences and measurable contributions.",
      "Use bullet points with strong action verbs like 'Developed', 'Implemented', 'Optimized'.",
      "Add personal or side projects to showcase additional capabilities.",
      "Tailor your resume to the role — remove irrelevant experience."
    ]
  },
  "3-5 Years": {
    pages: "1.5 to 2 Pages Resume",
    tips: [
      "Begin with a short summary of your career growth and specialization area.",
      "Highlight leadership roles, mentoring, or contributions to team success.",
      "Show measurable impact (e.g., 'Improved performance by 25%').",
      "Include both technical and managerial achievements if applicable.",
      "Avoid listing too many tools — focus on skills that define your niche."
    ]
  },
  "5+ Years": {
    pages: "2 Pages Resume",
    tips: [
      "Start with a powerful executive summary emphasizing leadership and business impact.",
      "Focus on achievements that show strategy, innovation, and problem-solving ability.",
      "Quantify results — numbers speak louder than responsibilities.",
      "Highlight cross-functional experience, mentoring, and decision-making roles.",
      "Keep it clean — remove early career details unless they add unique value."
    ]
  }
};

  const handleTempChange = (e) => {
    const { name, value } = e.target;
    setTempExp({ ...tempExp, [name]: value });
  };

  const addExperience = () => {
    if (tempExp.title.trim() === "" || tempExp.company.trim() === "") {
      alert("Please enter at least Job Title and Company Name.");
      return;
    }

    const updated = [...experienceList, tempExp];
    setExperienceList(updated);
    handleChange("experience", updated);
    setTempExp({ title: "", company: "", duration: "", description: "" });
  };

  const removeExperience = (index) => {
    const updated = experienceList.filter((_, i) => i !== index);
    setExperienceList(updated);
    handleChange("experience", updated);
  };

  return (
    <div className="experience-section">
      <h2>Work Experience</h2>

      {/* Step 1: Experience Level Selector */}
      <div className="exp-selector">
        <label>Select Years of Experience:</label>
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 Years">1-3 Years</option>
          <option value="3-5 Years">3-5 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>
      </div>

      {/* Step 2: Show Advice Based on Selection */}
      {experienceLevel && (
        <div className="experience-advice">
          <h3>📘 Advice for {experienceLevel}</h3>
          <p><strong>Recommended Resume Length:</strong> {experienceAdvice[experienceLevel].pages}</p>
          <ul>
            {experienceAdvice[experienceLevel].tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="experience-subtitle">Add up to 3 work experiences below.</p>

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

      {/* Add New Experience */}
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
