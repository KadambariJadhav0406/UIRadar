import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserPlus,
  FaBoxOpen,
  FaUsers,
  FaBoxes,
  FaHistory,
  FaMoneyBillWave,
  FaComments
} from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
  return (
    <div>
      <AdminNavbar />
      <div className="layout-container">
        <div
          className="sidebar"
          style={{ border: "2px solid black", display: "flex", backgroundColor: "#d8cdc7" }}
        >
          <div className="sidebar-header">
            <h3>Admin</h3>
          </div>
          <nav className="sidebar-nav">

            <NavLink to="/admin/addengineer" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaUserPlus className="icon" /> Add Engineer
            </NavLink>

            <NavLink to="/admin/addpackage" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaBoxOpen className="icon" /> Add Package
            </NavLink>

            <NavLink to="/admin/viewengineers" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaUsers className="icon" /> View Engineers
            </NavLink>

            <NavLink to="/admin/viewpackages" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaBoxes className="icon" /> View Packages
            </NavLink>

            <NavLink to="/admin/viewpaymenthistory" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaHistory className="icon" /> Buying History
            </NavLink>

            <NavLink to="/admin/questionAndAnswer" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaComments className="icon" /> Q/A
            </NavLink>

          </nav>
        </div>

        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Admin;
