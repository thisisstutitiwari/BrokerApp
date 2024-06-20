import React, { useState } from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};

const Navbar = ({ navLinks }) => {
  const userId = localStorage.getItem("userId");

  const location = useLocation();

  // State to manage the visibility of the "My Account" dropdown
  const [showMyAccountDropdown, setShowMyAccountDropdown] = useState(false);

  // Function to toggle the "My Account" dropdown
  const toggleMyAccountDropdown = () => {
    setShowMyAccountDropdown(!showMyAccountDropdown);
  };

  return (
    <nav
      className="navbar navbar-expand-lg p-2 navbar-dark "
      style={{ backgroundColor: "#001f3f", zIndex: 100 }}
    >
      <Link to={"/"} className="navbar-brand" style={{ fontFamily: "papyrus" }}>
        Real Estate
        <img src="broker12.png" style={{ width: "45px", height: "45px" }} />
      </Link>
      <ul className="navbar-nav ms-auto">
        {location.pathname !== "/search" && (
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              <div className="d-flex align-items-center">
                <i
                  class="large material-icons"
                  style={{ fontSize: "20px", paddingRight: "2px" }}
                >
                  search
                </i>
                Search
              </div>
            </Link>
          </li>
        )}

        {userId && (
          <li
            className={`nav-item dropdown ${
              showMyAccountDropdown ? "show" : ""
            }`}
            onMouseEnter={toggleMyAccountDropdown}
            onMouseLeave={toggleMyAccountDropdown}
          >
            <div
              className="nav-link dropdown-toggle"
              onClick={() => {}}
              style={{ cursor: "pointer" }}
            >
              My Account
            </div>
            <ul
              className={`dropdown-menu ${showMyAccountDropdown ? "show" : ""}`}
            >
              <li>
                <Link className="dropdown-item" to={"/mydetails"}>
                  My Details
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/editdetails"}>
                  Edit Details
                </Link>
              </li>
            </ul>
          </li>
        )}

        {navLinks &&
          Object.entries(navLinks).map(([key, value]) => (
            <li className="nav-item" key={key}>
              <Link className="nav-link" to={`/${key}`}>
                {value}
              </Link>
            </li>
          ))}
        <li className="nav-item">
          {userId ? (
            <Link className="nav-link" onClick={handleLogout}>
              Log Out
            </Link>
          ) : (
            location.pathname !== "/login" && (
              <Link className="nav-link" to="/login">
                User login
              </Link>
            )
          )}
        </li>
      </ul>
    </nav>
  );
};

export { Navbar, handleLogout };