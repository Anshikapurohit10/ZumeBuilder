
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

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  const formatLink = (link) =>
    link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <div className="resume-preview-container">
      <div className="preview-content">
        {/* HEADER */}
        <header className="resume-header">
          <h1>{fullName || "Your Name"}</h1>

          {jobTitle && <div className="resume-job-title">{jobTitle}</div>}

          <div className="resume-contact">
            {email && <span>{email}</span>}
            {email && (phone || city || formData.links?.length > 0) && (
              <span className="contact-separator">|</span>
            )}
            {formData.links?.map((link, i) => (
              <React.Fragment key={i}>
                <a href={link} target="_blank" rel="noreferrer">
                  {formatLink(link)}
                </a>
                <span className="contact-separator">|</span>
              </React.Fragment>
            ))}
            {phone && <span>{phone}</span>}
            {phone && city && <span className="contact-separator">|</span>}
            {city && <span>{city}</span>}
          </div>
        </header>

        {/* CAREER OBJECTIVE */}
        {summary && (
          <section className="resume-section">
            <h2>Career Objective</h2>
            <p className="summary-text">{summary}</p>
          </section>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>

            {education.map((edu, i) => (
              <div className="education-entry" key={i}>
                <div className="entry-topline">
                  <strong>{edu.school}</strong>
                  <span>
                    {[edu.startYear, edu.endYear].filter(Boolean).join("-")}
                    {edu.startYear || edu.endYear ? " | " : ""}
                    {edu.status || ""}
                  </span>
                </div>

                <div className="entry-bottomline">
                  <span>
                    {[edu.degree, edu.branch].filter(Boolean).join(" ")}
                  </span>
                  {edu.cgpa && (
                    <strong>
                      {String(edu.cgpa).toLowerCase().includes("cgpa")
                        ? edu.cgpa
                        : `CGPA: ${edu.cgpa}`}
                    </strong>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <section className="resume-section">
            <h2>Skills</h2>

            <div className="skills-content">
              {skills.map((skill, i) => (
                <div className="skill-row" key={i}>
                  <strong>{skill.category || skill.name}:</strong>{" "}
                  {skill.category
                    ? skill.name
                    : skill.level
                    ? `${skill.name} (${skill.level})`
                    : ""}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <section className="resume-section">
            <h2>Experience</h2>

            {experience.map((exp, i) => (
              <div className="experience-entry" key={i}>
                <div className="entry-topline">
                  <strong>
                    {exp.title}
                    {exp.company ? ` — ${exp.company}` : ""}
                  </strong>
                  <span>{exp.duration}</span>
                </div>

                {exp.description && (
                  <div className="entry-description">
                    {exp.description.split("\n").map((line, j) => (
                      <div key={j} className="description-line">
                        {line.trim() && !/^[•\-]/.test(line.trim()) && (
                          <span className="bullet">• </span>
                        )}
                        {line.replace(/^[•\-]\s*/, "")}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <section className="resume-section">
            <h2>Projects</h2>

            {projects.map((proj, i) => (
              <div className="project-entry" key={i}>
                <div className="entry-topline">
                  <strong>{proj.title}</strong>
                  <span>{proj.duration || proj.date || ""}</span>
                </div>

                {proj.link && (
                  <a
                    className="resume-project-link"
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {formatLink(proj.link)}
                  </a>
                )}

                {proj.description && (
                  <div className="project-description">
                    {proj.description.split("\n").map((line, j) => {
                      const match = line.match(
                        /^(Problem|Objective|Outcome|Tech|Technologies|Role):\s*/i
                      );

                      return (
                        <p key={j}>
                          {match && <strong>{match[1]}: </strong>}
                          {match
                            ? line.slice(match[0].length)
                            : line.replace(/^[•\-]\s*/, "")}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* CERTIFICATES */}
        {certificates.length > 0 && (
          <section className="resume-section">
            <h2>Certificates</h2>

            {certificates.map((cert, i) => (
              <div className="certificate-entry" key={i}>
                <strong>{cert.name}</strong>
                {cert.organization && (
                  <span className="certificate-org">
                    {" "}
                    — {cert.organization}
                  </span>
                )}
                {cert.year && <span> ({cert.year})</span>}
                {cert.link && (
                  <>
                    {" "}
                    <a href={cert.link} target="_blank" rel="noreferrer">
                      [View]
                    </a>
                  </>
                )}
              </div>
            ))}
          </section>
        )}

        {/* REFERENCES */}
        {formData.references?.length > 0 && (
          <section className="resume-section">
            <h2>References</h2>

            {formData.references.map((ref, i) => (
              <div className="reference-entry" key={i}>
                <strong>{ref.name}</strong>
                {ref.position && ` — ${ref.position}`}
                {ref.company && `, ${ref.company}`}
                <div>
                  {[ref.email, ref.phone].filter(Boolean).join(" | ")}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
