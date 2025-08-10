import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import {
  BsCartFill,
  BsPersonCircle,
  BsListCheck,
  BsChatDotsFill,
} from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";
import { toast } from "react-toastify";

function CustomerNavbar({ cartCount }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");

  const handleQnAClick = () => {
    if (userId) {
      navigate("/askQuestion");
    } else {
      toast.info("Login to ask a question", { autoClose: 2000 });
    }
  };

  const handleLogoutClick = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const gradientStyle = {
    background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
    border: "none",
    color: "white",
    fontWeight: "bold",
    padding: "0.5rem 1.2rem",
    borderRadius: "50px",
    transition: "all 0.3s ease",
  };

  const gradientHoverStyle = {
    filter: "brightness(0.9)",
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3 shadow-sm"
      style={{
        minHeight: "10vh",

        backgroundColor: "#ffffffff",
      }}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <NavLink
          className="navbar-brand fw-bold fs-3 d-flex align-items-center"
          to="/"
          style={{
            color: "#222",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "900",
              fontSize: "1.8rem",
            }}
          >
            UIRadar
          </span>
        </NavLink>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
            {/* Profile / Sign In */}
            <li
              className="nav-item dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: "relative" }}
            >
              <button className="btn btn-outline-orange fw-semibold px-3 py-2 btn-orange-pill">
                <BsPersonCircle size={20} className="me-2" />
                {userId ? "Profile" : "Sign In"}
              </button>

              {isDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    top: "100%",
                    left: 0,
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    minWidth: "180px",
                    padding: "8px 0",
                  }}
                >
                  {userId ? (
                    <>
                      <button
                        className="dropdown-item py-2"
                        onClick={() => navigate(`/viewpackages`)}
                      >
                        Your Package
                      </button>
                      <button
                        className="dropdown-item py-2"
                        onClick={() => navigate(`/editprofile/${userId}`)}
                      >
                        Profile
                      </button>
                      <button
                        className="dropdown-item py-2 text-danger"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="dropdown-item py-2"
                        onClick={handleLoginClick}
                      >
                        Login
                      </button>
                      <button
                        className="dropdown-item py-2"
                        onClick={handleRegisterClick}
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </li>

            {/* <li className="nav-item">
              <NavLink to={`/createrequest`}>
                <button className="btn btn-outline-dark fw-semibold px-3 py-2 rounded-pill">
                  <BsListCheck size={20} className="me-2" />
                  Raise a Request
                </button>
              </NavLink>
            </li> */}

            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-dark fw-semibold px-3 py-2 rounded-pill dropdown-toggle"
                id="serviceDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Service
              </button>
              <ul className="dropdown-menu" aria-labelledby="serviceDropdown">
                <li>
                  <NavLink to="/createrequest" className="dropdown-item">
                    Create Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/viewrequests" className="dropdown-item">
                    View Requests
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Reviews */}
            <li className="nav-item">
              <NavLink to={`/reviews`}>
                <button className="btn btn-outline-dark fw-semibold px-3 py-2 rounded-pill">
                  <BsChatDotsFill size={20} className="me-2" />
                  Reviews
                </button>
              </NavLink>
            </li>

            {/* QnA */}
            <li className="nav-item">
              <button
                className="btn btn-outline-dark fw-semibold px-3 py-2 rounded-pill"
                onClick={handleQnAClick}
              >
                <FaUserMd size={20} className="me-2" />
                QnA
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
