import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/signup");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
           <div className="logo">👋 {userName}</div>
      </div>

      <div className="navbar-right">
        <button className="upgrade-btn">Upgrade Plan</button>

        <div className="profile-menu">
          <FaUserCircle
            className="profile-icon"
            onClick={toggleDropdown}
            size={28}
          />

          {isDropdownOpen && (
            <ul className="dropdown">
              <li onClick={() => navigate("/dashboard")}>Dashboard</li>
              <li>Account settings</li>
              <li>FAQs</li>
              <li>Blog</li>
              <li className="signout" onClick={handleLogout}>
                Sign out
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
