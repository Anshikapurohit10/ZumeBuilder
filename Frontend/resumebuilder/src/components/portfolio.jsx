import React, { useState } from "react";
import "./portfolio.css";
import { useNavigate } from "react-router-dom";

export default function FormPage({ onSubmit }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    heroAbout: "",
    about: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    image: "",
    skills: [""],
    projects: [{ title: "", description: "", link: "" }],
    certificates: [{ title: "", image: "" }],
  });

  // 🧩 Handle all normal input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setForm({ ...form, image: URL.createObjectURL(files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 🛠 Skill handlers
  const handleSkillChange = (index, value) => {
    const updated = [...form.skills];
    updated[index] = value;
    setForm({ ...form, skills: updated });
  };

  const addSkill = () => setForm({ ...form, skills: [...form.skills, ""] });
  const removeSkill = (index) => {
    const updated = form.skills.filter((_, i) => i !== index);
    setForm({ ...form, skills: updated });
  };

  // 💼 Project handlers
  const handleProjectChange = (index, field, value) => {
    const updated = [...form.projects];
    updated[index][field] = value;
    setForm({ ...form, projects: updated });
  };

  const addProject = () =>
    setForm({
      ...form,
      projects: [...form.projects, { title: "", description: "", link: "" }],
    });

  const removeProject = (index) => {
    const updated = form.projects.filter((_, i) => i !== index);
    setForm({ ...form, projects: updated });
  };

  // 🏅 Certificate handlers
  const handleCertChange = (index, field, value) => {
    const updated = [...form.certificates];
    updated[index][field] = value;
    setForm({ ...form, certificates: updated });
  };

  const handleCertImage = (index, file) => {
    const updated = [...form.certificates];
    updated[index].image = URL.createObjectURL(file);
    setForm({ ...form, certificates: updated });
  };

  const addCertificate = () =>
    setForm({
      ...form,
      certificates: [...form.certificates, { title: "", image: "" }],
    });

  const removeCertificate = (index) => {
    const updated = form.certificates.filter((_, i) => i !== index);
    setForm({ ...form, certificates: updated });
  };

  // 🚀 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    navigate("/PortfolioPreview");
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

      <div className="form-container">
        <h2>✨ Build Your Professional Portfolio</h2>

        <form onSubmit={handleSubmit}>
          {/* 🔤 Basic Info */}
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            name="role"
            placeholder="Your Role (e.g. Frontend Developer)"
            onChange={handleChange}
            required
          />
             <textarea
            name="heroAbout"
            placeholder="Short intro (e.g. Passionate Frontend Developer...)"
            onChange={handleChange}
          />
           <textarea
            name="about"
            placeholder="Detailed about section (tell more about yourself)"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
          />

          {/* 💡 Skills Section */}
          <h3>💡 Skills</h3>
          {form.skills.map((skill, index) => (
            <div key={index} className="dynamic-input">
              <input
                type="text"
                placeholder={`Skill ${index + 1}`}
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              />
              {form.skills.length > 1 && (
                <button type="button" onClick={() => removeSkill(index)}>
                  ❌
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSkill} className="btn-add">
            + Add Skill
          </button>

          {/* 📁 Projects Section */}
          <h3>📁 Projects</h3>
          {form.projects.map((proj, index) => (
            <div key={index} className="project-block">
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
              />
              <textarea
                placeholder="Project Description"
                value={proj.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Project Link (optional)"
                value={proj.link}
                onChange={(e) =>
                  handleProjectChange(index, "link", e.target.value)
                }
              />
              {form.projects.length > 1 && (
                <button type="button" onClick={() => removeProject(index)}>
                  ❌
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addProject} className="btn-add">
            + Add Project
          </button>

          {/* 🏅 Certificates Section */}
          <h3>🏅 Certificates</h3>
          {form.certificates.map((cert, index) => (
            <div key={index} className="cert-block">
              <input
                type="text"
                placeholder="Certificate Title"
                value={cert.title}
                onChange={(e) =>
                  handleCertChange(index, "title", e.target.value)
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleCertImage(index, e.target.files[0])}
              />
              {cert.image && (
                <img
                  src={cert.image}
                  alt="Certificate Preview"
                  className="cert-preview"
                />
              )}
              {form.certificates.length > 1 && (
                <button type="button" onClick={() => removeCertificate(index)}>
                  ❌
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addCertificate} className="btn-add">
            + Add Certificate
          </button>

          {/* ☎️ Contact Section */}
          <h3>📞 Contact Information</h3>
          <input
            name="phone"
            placeholder="Phone Number (optional)"
            onChange={handleChange}
          />
          <input
            name="linkedin"
            placeholder="LinkedIn Profile URL"
            onChange={handleChange}
            required
          />
          <input
            name="github"
            placeholder="GitHub Profile URL"
            onChange={handleChange}
            required
          />

          {/* 📸 Profile Image */}
          <label>Upload Profile Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit" className="btn-generate">
            Generate Portfolio 🚀
          </button>
        </form>
      </div>
    </>
  );
}
