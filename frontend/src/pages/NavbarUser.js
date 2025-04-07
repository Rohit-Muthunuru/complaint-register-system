// src/components/NavbarUser.js
import React from "react";
import { Link } from "react-router-dom";
import  { useEffect, useState } from "react";

const NavbarUser = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  
    useEffect(() => {
      const handleStorageChange = () => {
        setName(localStorage.getItem("name") || ""); // Update state when localStorage changes
      };
  
      window.addEventListener("storage", handleStorageChange);
  
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#212166' }}>
    <div className="container">
      <Link className="navbar-brand" to="/">
        Complaint Manager
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex justify-content-between align-items-center w-100" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/user/complaintlist">
              My Complaints
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/createcomplaint">
              New Complaint
            </Link>
          </li>
          {/* <li>
          <span><h1>Hello</h1></span>
          </li> */}
        </ul>
        <div className="mx-auto text-center">
            <h3 className="m-0" style={{ fontFamily: "cursive", fontSize: "22px", fontWeight: "bold", color: "white" }}>Welcome {name} !!</h3>
          </div>
        
        
       

        <button className="btn btn-outline-light ms-auto" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </nav>
  );
};

export default NavbarUser;
