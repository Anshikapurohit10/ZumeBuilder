import React, { useState } from "react";
import "./Certificate.css";

const Certificate = ({ formData, handleChange }) => {
  const [certificates, setCertificates] = useState(formData.certificates || []);

  // Add new certificate
  const addCertificate = () => {
    setCertificates([
      ...certificates,
      { name: "", organization: "", year: "", link: "" },
    ]);
  };

  // Update certificate fields
  const updateCertificate = (index, field, value) => {
    const updated = [...certificates];
    updated[index][field] = value;
    setCertificates(updated);
    handleChange("certificates", updated);
  };

  // Delete certificate
  const removeCertificate = (index) => {
    const updated = certificates.filter((_, i) => i !== index);
    setCertificates(updated);
    handleChange("certificates", updated);
  };

  return (
    <div className="certificate-form">
      <h2>Certificates</h2>
      {certificates.map((cert, index) => (
        <div key={index} className="certificate-entry">
          <input
            type="text"
            placeholder="Certificate Name"
            value={cert.name}
            onChange={(e) => updateCertificate(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Organization / Platform"
            value={cert.organization}
            onChange={(e) =>
              updateCertificate(index, "organization", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Year"
            value={cert.year}
            onChange={(e) => updateCertificate(index, "year", e.target.value)}
          />
          <input
            type="url"
            placeholder="Certificate Link (optional)"
            value={cert.link}
            onChange={(e) => updateCertificate(index, "link", e.target.value)}
          />
          <button
            className="remove-btn"
            onClick={() => removeCertificate(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button className="add-btn" onClick={addCertificate}>
        + Add Certificate
      </button>
    </div>
  );
};

export default Certificate;
