// src/components/UserPage.js

import NavbarUser from "./NavbarUser";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
//import ComplaintList from "./ComplaintList"

const UserPage = () => {

  return (
    <div className="container-fluid">
      <NavbarUser />
      <Outlet />
      <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh", color: "black" }}>
        

        <div className="container">
          <div className="row align-items-center"> 
            <div className="col-md-6" style={{ marginTop: "60px" }}>
              <h1 className="display-4" style={{ fontFamily: "cursive", color: "white", fontWeight: "600" }}>Welcome to <span style={{color:"yellow"}}>Complaint Management System </span> </h1>
              <p className="lead" style={{ fontFamily: "cursive", color: "#E0E0E0" }}>
              Our platform allows you to effortlessly register complaints and track their progress in real time. Whether you need to report an issue or review past complaints, our system ensures a seamless and transparent experience.
              </p>
              <div style={{ marginTop: "60px" }}>
              <h3 style={{ fontFamily: "cursive", color: "#E0E0E0" }}>Register Your New Complaint <Link to="/user/createcomplaint" className="btn btn-warning">Here</Link></h3>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="https://smallbizclub.com/wp-content/uploads/2019/07/Successfully-Deal-with-Customer-Complaints.jpg"
                alt="Hero"
                className="img-fluid"
                style={{ marginTop: "60px" }}
              />
            </div>
          </div>
        </div>
        </div>
        
      </div>
      );
};

      export default UserPage;
