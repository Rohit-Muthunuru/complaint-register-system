// src/components/AdminPage.js

import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

const AdminPage = () => {
  
  return (
    <div className="container-fluid">
      <NavbarAdmin />
      <Outlet /> {/* This will render the nested routes */}
     
    </div>
  );
};

export default AdminPage;