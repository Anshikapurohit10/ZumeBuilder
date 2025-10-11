import React, { useState, useEffect } from "react";
import "./Education.css";

const Education = ({ formData, handleChange }) => {
  const [educationList, setEducationList] = useState(
    formData.education?.length
      ? formData.education
      : [
          {
            school: "",
            degree: "",
            branch: "",
            startYear: "",
            endYear: "",
            cgpa: "",
          },
        ]
  );

  // Whenever educationList changes, update parent state
  useEffect(() => {
    handleChange("education", educationList);
  }, [educationList]);

  const handleEduChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...educationList];
    updated[index][name] = value;
    setEducationList(updated);
  };

  const addEducation = () => {
    if (educationList.length < 3) {
      setEducationList([
        ...educationList,
        {
          school: "",
          degree: "",
          branch: "",
          startYear: "",
          endYear: "",
          cgpa: "",
        },
      ]);
    } else {
      alert("You can only add up to 3 education details.");
    }
  };

  const removeEducation = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
  };

  return (
    <div className="education-section">
      <h2>Education Details</h2>
      <p className="education-subtitle">Add up to 3 educational qualifications.</p>

      {educationList.map((edu, index) => (
        <div key={index} className="education-card">
          <div className="edu-row">
            <input
              type="text"
              name="school"
              placeholder="School / College"
              value={edu.school}
              onChange={(e) => handleEduChange(index, e)}
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleEduChange(index, e)}
            />
          </div>

          <div className="edu-row">
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={edu.branch}
              onChange={(e) => handleEduChange(index, e)}
            />
            <input
              type="text"
              name="cgpa"
              placeholder="CGPA / Percentage"
              value={edu.cgpa}
              onChange={(e) => handleEduChange(index, e)}
            />
          </div>

          <div className="edu-row">
            <input
              type="text"
              name="startYear"
              placeholder="Start Year"
              value={edu.startYear}
              onChange={(e) => handleEduChange(index, e)}
            />
            <input
              type="text"
              name="endYear"
              placeholder="End Year"
              value={edu.endYear}
              onChange={(e) => handleEduChange(index, e)}
            />
          </div>

          {educationList.length > 1 && (
            <button
              className="remove-btn"
              onClick={() => removeEducation(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button className="add-more-btn" onClick={addEducation}>
        + Add More
      </button>
    </div>
  );
};

export default Education;
