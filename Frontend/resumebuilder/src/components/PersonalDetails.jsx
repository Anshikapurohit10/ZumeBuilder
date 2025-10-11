import React ,{ useState } from "react";
import "./PersonalDetails.css";

const PersonalDetails = ({ formData, handleChange }) => { 
   const [links, setLinks] = useState(formData.links || [""]);

  // Update individual link
  const handleLinkChange = (index, e) => {
    const updatedLinks = [...links];
    updatedLinks[index] = e.target.value;
    setLinks(updatedLinks);
    handleChange("links", updatedLinks); // update parent formData
  };

  // Add new link
  const addLink = () => {
    if (links.length < 3) {
      setLinks([...links, ""]);
    }
  };

  // Remove link
  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    handleChange("links", updatedLinks);
  };

  return (
    <div className="personal-details">
      <h3>Personal Details</h3>
      <form>
        <div className="form-group">
          <label>Current Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Your current designation"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>
   <div className="links-section">
          <label>Links (max 3)</label>
          {links.map((link, index) => (
            <div key={index} className="link-input-row">
              <input
                type="text"
                placeholder="https://yourlink.com"
                value={link}
                onChange={(e) => handleLinkChange(index, e)}
              />
              {links.length > 1 && (
                <button
                  type="button"
                  className="remove-link-btn"
                  onClick={() => removeLink(index)}
                >
                
                </button>
              )}
            </div>
          ))}
          {links.length < 3 && (
            <button type="button" className="add-link-btn" onClick={addLink}>
              + Add Link
            </button>
          )}
        </div>
      
      </form>
    </div>
  );
};

export default PersonalDetails;
