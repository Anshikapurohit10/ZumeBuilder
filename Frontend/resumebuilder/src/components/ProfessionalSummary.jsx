
import "./ProfessionalSummary.css";

const ProfessionalSummary = ({ formData, handleChange }) => {

  const handleSummaryChange = (e) => {
    const value = e.target.value.slice(0, 300); // limit to 300 chars
    handleChange("summary", value);
  };

  return (
     <div className="professional-summary">
      <h2>Professional Summary</h2>
      <textarea
      name="summary"
        value={formData.summary  || ""}
        onChange={handleSummaryChange}
        placeholder="Write a short professional summary (max 300 characters)"
        maxLength={300}
      />
      <p>{300 - (formData.summary?.length || 0)} characters remaining</p>
    </div>
  );
};

export default ProfessionalSummary;
