import React, { useState, useEffect } from "react";
import "./Section.css";

const Projects = ({ formData, handleChange }) => {
  // Initialize with existing formData.projects if any
  const [projects, setProjects] = useState(
    formData.projects.length > 0
      ? formData.projects
      : [{ title: "", link: "", description: "" }]
  );

  // Update parent formData in real time
  useEffect(() => {
    handleChange("projects", projects);
  }, [projects]);

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...projects];
    updated[index][name] = value;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", link: "", description: "" }]);
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div className="section-container">
      <h2>Projects</h2>
      <p className="subtitle">
        Add personal or professional projects that demonstrate your abilities.
      </p>

      {projects.map((proj, index) => (
        <div key={index} className="input-group">
          <input
            type="text"
            name="title"
            value={proj.title}
            onChange={(e) => handleProjectChange(index, e)}
            placeholder="Project Title"
            className="text-input"
          />
          <input
            type="text"
            name="link"
            value={proj.link}
            onChange={(e) => handleProjectChange(index, e)}
            placeholder="Project Link (optional)"
            className="text-input"
          />
          <textarea
            name="description"
            value={proj.description}
            onChange={(e) => handleProjectChange(index, e)}
            placeholder="Short project description..."
            className="text-input large"
          />
          {projects.length > 1 && (
            <button className="remove-btn" onClick={() => removeProject(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button className="add-btn" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
};

export default Projects;
