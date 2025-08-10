import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddPackage.css";
import Admin from "./Admin";

function AddPackage() {
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [engineerId, setEngineerId] = useState("");
  const [engineers, setEngineers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5050/admin/getAllEngineers",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          }
        );
        setEngineers(res.data || []);
      } catch (err) {
        console.error("Error fetching engineers:", err);
      }
    };

    fetchEngineers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!packageName || !description || !price || !engineerId) {
      setError("All fields are required.");
      return;
    }

    const payload = {
      PackageName: packageName,
      Description: description,
      Price: parseFloat(price),
      EngineerId: parseInt(engineerId),
    };

    try {
      const res = await axios.post(
        "http://localhost:5050/package/createPackage",
        payload,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        alert("Package created successfully!");
        setPackageName("");
        setDescription("");
        setPrice("");
        setEngineerId("");
        setError("");
      }
    } catch (err) {
      console.error("Error creating package:", err);
      setError("Failed to create package. Please try again.");
    }
  };

  return (
    <Admin>
      <div className="add-category-container">
        <h3 className="mb-4">Add New Package</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Package Name</label>
            <input
              type="text"
              className="form-control"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="Enter package name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter package description"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              step="0.01"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Engineer</label>
            <select
              className="form-select"
              value={engineerId}
              onChange={(e) => setEngineerId(e.target.value)}
              required
            >
              <option value="">-- Select Engineer --</option>
              {engineers.map((eng) => (
                <option key={eng.userId} value={eng.userId}>
                  {eng.userName}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-danger">{error}</p>}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddPackage;
