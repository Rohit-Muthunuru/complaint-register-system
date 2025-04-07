// src/components/NavbarAdmin.js
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NavbarAdmin = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  
    useEffect(() => {
      const handleStorageChange = () => {
        setName(localStorage.getItem("name") || ""); // Update state when localStorage changes
      };
  
      window.addEventListener("storage", handleStorageChange);
  
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    // <nav>
    //   <Link to="/admin/dashboard">Dashboard</Link>
    //   <button onClick={handleLogout}>Logout</button>
    // </nav>
    <nav
    className="navbar navbar-expand-lg navbar-dark"
    style={{ backgroundColor: '#212529' }}
  >
    <div className="container">
      {/* Branding */}
      <Link className="navbar-brand" to="/admin/dashboard">
        Admin Panel
      </Link>

      {/* Toggler for small screens */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
        aria-controls="adminNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse" id="adminNavbar">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="mx-auto text-center">
            <h3 className="m-0" style={{ fontFamily: "cursive", fontSize: "22px", fontWeight: "bold", color: "white" }}>Welcome {name} !!</h3>
          </div>

        {/* Logout Button */}
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
  );
};

export default NavbarAdmin;
