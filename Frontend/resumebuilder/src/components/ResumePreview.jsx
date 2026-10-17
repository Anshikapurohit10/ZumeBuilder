import React from "react";
import "./ResumePreview.css";

const ResumePreview = ({ formData }) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    jobTitle,
    summary,
    education = [],
    skills = [],
    experience = [],
    projects = [],
    certificates = [],
  
  } = formData;

  return (
    <div className="resume-preview-container">
      <div className="preview-content">
        {/* ===== HEADER ===== */}
        <div className="resume-header">
          <h1>
            {firstName || lastName ? `${firstName} ${lastName}` : "Your Name"}
          </h1>
          <p>
            {jobTitle && <p>{jobTitle}</p>}
            <br />
            {email || "youremail@example.com"} | {phone || "Your Phone"} |{" "}
            {city ? `${city}` : "Your Location"}
          </p>

          {/* Personal Links */}
          {formData.links && formData.links.length > 0 && (
            <p className="personal-links">
              {formData.links.map((link, i) => (
                <span key={i}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                  {i !== formData.links.length - 1 && " | "}
                </span>
              ))}
            </p>
          )}
        </div>

        {/* ===== SUMMARY ===== */}
        {summary && (
          <div className="resume-section">
            <h2>Professional Summary</h2>
            <p>{summary || "Write your professional summary here..."}</p>
          </div>
        )}

        {/* ===== EDUCATION ===== */}
        {education.length > 0 && (
          <div className="resume-section education-preview-section">
            <h2 className="section-title">Education</h2>
            <div className="section-divider"></div>
            {education.map((edu, i) => (
              <div className="education-entry" key={i}>
                <div className="edu-line-1">
                  <span className="edu-school">{edu.school}</span>
                  <span className="edu-cgpa">CGPA: {edu.cgpa}</span>
                </div>

                <div className="edu-line-2">
                  <span className="edu-degree">
                    {edu.degree} {edu.branch}
                  </span>
                  <span className="edu-dates">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== SKILLS ===== */}
        {skills.length > 0 && (
          <div className="resume-section skills-preview">
            <h2>Skills</h2>
            <ul>
              {skills.map((skill, i) => (
                <li key={i} className="skill-item-row">
                  <span className="skill-name">{skill.name}</span>
                  {skill.level && (
                    <span className="skill-level-right">{skill.level}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ===== EXPERIENCE ===== */}
        {experience.length > 0 && (
          <div className="resume-section">
            <h2>Experience</h2>
            <ul>
              {experience.map((exp, i) => (
                <li key={i} className="experience-item">
                  <div className="exp-header">
                    <strong>
                      {exp.title} — {exp.company}
                    </strong>
                    <span className="duration">{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <div className="exp-desc">{exp.description}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ===== PROJECTS ===== */}
        {projects.length > 0 && (
          <div className="resume-section">
            <h2 className="projects-title">Projects</h2>
            <ul className="projects-list">
              {projects.map((proj, i) => (
                <li key={i} className="project-item">
                  <div className="project-header">
                    <strong className="project-title">{proj.title}</strong>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        [Link]
                      </a>
                    )}
                  </div>
                  <p className="project-desc">{proj.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

  
{certificates.length > 0 && (
  <div className="resume-section">
    <h2>Certificates</h2>
    <ul>
      {certificates.map((cert, i) => (
        <li key={i} className="certificate-item">
          <strong>{cert.name}</strong> — {cert.organization} ({cert.year})
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-link"
            >
              [View]
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
)}

{formData.references && formData.references.length > 0 && (
  <div className="resume-section">
    <h2>References</h2>
    <ul className="reference-list">
      {formData.references.map((ref, i) => (
        <li key={i} className="reference-item">
          <strong>{ref.name}</strong> — {ref.position}, {ref.company}
          <br />
          <span className="ref-contact">
            {ref.email && <span>{ref.email}</span>}
            {ref.phone && <> | {ref.phone}</>}
          </span>
        </li>
      ))}
    </ul>
  </div>
)}


      </div>
    </div>
  );
};

export default ResumePreview;
