import React, { useState } from "react";
import "./Reference.css";

const Reference = ({ formData, handleChange }) => {
  const [references, setReferences] = useState(formData.references || []);

  // Add new reference
  const addReference = () => {
    setReferences([
      ...references,
      { name: "", position: "", company: "", email: "", phone: "" },
    ]);
  };

  // Update a specific reference field
  const updateReference = (index, field, value) => {
    const updated = [...references];
    updated[index][field] = value;
    setReferences(updated);
    handleChange("references", updated);
  };

  // Remove a reference
  const removeReference = (index) => {
    const updated = references.filter((_, i) => i !== index);
    setReferences(updated);
    handleChange("references", updated);
  };

  return (
    <div className="reference-form">
      <h2>References</h2>
      <p className="subtitle">Add people who can verify your experience or skills.</p>

      {references.map((ref, index) => (
        <div key={index} className="reference-entry">
          <input
            type="text"
            placeholder="Full Name"
            value={ref.name}
            onChange={(e) => updateReference(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Position / Designation"
            value={ref.position}
            onChange={(e) => updateReference(index, "position", e.target.value)}
          />
          <input
            type="text"
            placeholder="Company / Organization"
            value={ref.company}
            onChange={(e) => updateReference(index, "company", e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={ref.email}
            onChange={(e) => updateReference(index, "email", e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={ref.phone}
            onChange={(e) => updateReference(index, "phone", e.target.value)}
          />
          <button className="remove-btn" onClick={() => removeReference(index)}>
            Remove
          </button>
        </div>
      ))}

      <button className="add-btn" onClick={addReference}>
        + Add Reference
      </button>
    </div>
  );
};

export default Reference;
