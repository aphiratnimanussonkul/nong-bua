import React from "react";

import "./admin.scss";
import SideNav from "../../components/side-nav/side-nav";
import ManagementRoutes from "./routes";

import './admin.scss'

const Admin = () => {
  return (
    <div className="management-container">
      <SideNav></SideNav>
      <ManagementRoutes></ManagementRoutes>
    </div>
  );
};

export default Admin;
