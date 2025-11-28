import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const userName = userData.name || "User";
  const userEmail = userData.email || "example@email.com";
  const userPhoto =
    userData.photo ||
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // 🧑 Default profile pic

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  // 🧠 Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-p">👋 {userName}</div>
      </div>

      <div className="navbar-right">
       <button className="upgrade-btn" onClick={() => navigate("/upgrade")}>
  Upgrade Plan
</button>


        <div className="profile-menu" ref={dropdownRef}>
          <img
            src={userPhoto}
            alt="Profile"
            className="profile-icon"
            onClick={toggleDropdown}
          />

         {isDropdownOpen && (
  <div className="profile-dropdown">
    <div className="profile-header">
      <img src={userPhoto} alt="Profile" className="profile-pic" />

      <div className="profile-info">
        <h4>{userName}</h4>
        <p>{userEmail}</p>
      </div>

      {/* ✏️ Edit Icon */}
      <span
        className="edit-icon"
        onClick={() => navigate("/account-settings")}
        title="Edit Profile"
      >
        ✏️
      </span>
    </div>

    <hr />
    <ul>
      <li onClick={() => navigate("/dashboard")}>Dashboard</li>
      <li onClick={() => navigate("/account-settings")}>Account Settings</li>
      <li onClick={() => navigate("/feedback")}>Feedback</li>
      <li onClick={handleLogout} className="signout">
        Sign Out
      </li>
    </ul>
  </div>
)}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
