import React from "react";
import { Link } from "react-router-dom";


function LandingPage() {
  return (
    <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh", color: "black" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand ms-4" href="#" style={{ fontFamily: "poppins, sans-serif", fontWeight: "600" }}>Complaint Management System</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
           {/* <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex gap-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href=" ">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href=" ">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href=" ">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href=" ">Disabled</a>
              </li>
            </ul> 

          </div> */}
        </div>
        <div className="ml-auto d-flex align-items-centre col-md-2">
          <Link to="/signup" className="btn btn-warning mx-4">Sign In</Link>
          <Link to="/login" className="btn btn-warning">Login</Link>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4" style={{ fontFamily: "cursive", color: "white",fontWeight: "600" }}>Welcome to Complaint  Management System</h1>
            <p className="lead" style={{ fontFamily: "poppins, sans-serif", color: "#E0E0E0" }}>
              Streamline the process of raising and resolving complaints effortlessly.
              Designed for both users and administrators, our system makes complaint
              management seamless and efficient.
            </p>
            <Link to="/login" className="btn btn-warning btn-lg">Get Started</Link>
          </div>
          <div className="col-md-6">
            <img
              src="https://as1.ftcdn.net/v2/jpg/02/11/07/58/1000_F_211075851_gSKybVNvDWgZnrIaleNsQfIz2mqPKaor.jpg"
              alt="Hero"
              className="img-fluid"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-#0D0D0D py-4 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4"style={{ fontFamily: "poppins, sans-serif", color: "white" }}>
                <h2>About</h2>
                <p>Complaint Management System helps users to submit and resolve complaints efficiently.</p>
              </div>
              <div className="col-md-4" style={{ fontFamily: "poppins, sans-serif", color: "white" }}>
                <h2>Links</h2>
                <ul className="list-unstyled">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-md-4"style={{ fontFamily: "poppins, sans-serif", color: "white" }}>
                <h2>Contact</h2>
                <p>Email: muthunururohit@gmail.com</p>
                <p>Phone: 7013154670</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>

  )
}

export default LandingPage