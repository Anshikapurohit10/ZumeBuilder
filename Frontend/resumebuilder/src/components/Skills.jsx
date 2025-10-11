import React, { useState, useEffect } from "react"; 
import "./Skills.css";

const Skills = ({ formData, handleChange }) => {
  const [skills, setSkills] = useState(formData.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState("Intermediate");
  const [hideLevel, setHideLevel] = useState(false);

  useEffect(() => {
    setSkills(formData.skills || []);
  }, [formData.skills]);

  useEffect(() => {
    handleChange("skills", skills);
  }, [skills]);

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.some((s) => s.name === newSkill)) {
      const updatedSkills = [...skills, { name: newSkill, level: newLevel }];
      setSkills(updatedSkills);
      setNewSkill("");
      setNewLevel("Intermediate");
    }
  };

  const removeSkill = (skillName) => {
    setSkills(skills.filter((s) => s.name !== skillName));
  };

  return (
    <div className="skills-container">
      <h2 className="skills-heading">Skills</h2>
      <p className="subtitle">
        Choose your most important skills. Make sure they match the job listing keywords.
      </p>

      {/* Toggle Button */}
      <button
        className="toggle-btn"
        onClick={() => setHideLevel(!hideLevel)}
      >
        {hideLevel ? "Show Levels" : "Hide Levels"}
      </button>

      {/* Skill Preview */}
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-tag">
            <span className="skill-name">{skill.name}</span>
            {!hideLevel && <span className="skill-level">({skill.level})</span>}
            <span className="remove-btn" onClick={() => removeSkill(skill.name)}>×</span>
          </div>
        ))}
      </div>

      {/* Add New Skill */}
      <div className="add-skill">
        <input
          type="text"
          placeholder="Add a new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="skill-input"
        />
        <select
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
          className="skill-select"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button className="add-btn" onClick={addSkill}>
          + Add Skill
        </button>
      </div>

      <div className="pro-tip">
        <h4>💡 Pro Tip</h4>
        <p>Add a mix of technical and soft skills relevant for the job you are applying for.</p>
      </div>
    </div>
  );
};

export default Skills;
