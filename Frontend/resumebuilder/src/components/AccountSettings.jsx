import React, { useState, useEffect } from "react";
import "./AccountSettings.css";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
    age: "",
    occupation:"",
  });

  const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
   const navigate = useNavigate();

   
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(user));
    alert("Profile updated successfully💥🎉!");
      navigate("/dashboard")
  };

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>

      <div className="profile-section">
        <img
          src={user.photo || defaultPhoto}
          alt="Profile"
          className="profile-img"
        />
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </div>

      <label>
        Name:
        <input name="name" value={user.name} onChange={handleChange} />
      </label>

      <label>
        Email:
        <input name="email" value={user.email} onChange={handleChange} />
      </label>
        <label>
        age:
        <input name="age" value={user.age} onChange={handleChange} />
      </label>
       <label>
        occupation:
        <input name="occupation" value={user.occupation} onChange={handleChange} />
      </label>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default AccountSettings;
