import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddEngineer.css";
import Admin from "./Admin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AddEngineer() {
  const [engineerName, setEngineerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   const role = sessionStorage.getItem("userRole");
  //   if (!sessionStorage.getItem("userName")) navigate("/");
  //   else if (role === "CUSTOMER") navigate("/customer");
  //   else if (role === "ENGINEER") navigate("/engineer");
  //   else if (role === "ADMIN") navigate("/admin");
  // }, [navigate]);

  const validateForm = () => {
    if (!engineerName || !email || !address || !pincode || !contact || !password) {
      setError("All fields are required.");
      return false;
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const pinRegex = /^[0-9]{6}$/;
    // const contactRegex = /^[0-9]{10}$/;
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    // Email: Only alphanumeric characters before and after '@', no other special characters
    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;

    // PIN: Exactly 6 digits, no dots or special characters
    const pinRegex = /^\d{6}$/;

    // Contact: Exactly 10 digits, no dots or special characters
    const contactRegex = /^\d{10}$/;

    // Password: Minimum 6 characters, at least one letter and one number, allowed special characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }

    if (!contactRegex.test(contact)) {
      setError("Contact must be 10 digits.");
      return false;
    }

    if (!pinRegex.test(pincode)) {
      setError("Pincode must be 6 digits.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters with a letter and a number.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const engineerData = {
      userName: engineerName,
      email,
      address,
      pincode,
      contact,
      password,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5050/admin/registerEngineer",
        engineerData,
        config
      );

      if (response.status === 200) {
        alert("Engineer added successfully!");
        setEngineerName("");
        setEmail("");
        setAddress("");
        setPincode("");
        setContact("");
        setPassword("");
        setError("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add engineer. Please try again.");
    }
  };

  return (
    <Admin>
      <div className="add-vets-container">
        <h3>Add New Engineer</h3>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Engineer Name</label>
            <input
              type="text"
              value={engineerName}
              onChange={(e) => setEngineerName(e.target.value)}
              placeholder="Enter engineer's name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter 6-digit pincode"
              maxLength="6"
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <span
                style={{ marginLeft: "-30px", cursor: "pointer" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddEngineer;
