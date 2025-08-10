import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function EditPackage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [engineerName, setEngineerName] = useState("");
  const [packageId, setPackageId] = useState(null); // store id internally

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  // Role based redirect
  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    } else if (sessionStorage.getItem("userRole") === "ENGINEER") {
      navigate("/engineer");
    }
  }, [navigate]);

  // Fetch package details on load
  useEffect(() => {
    axios
      .get(`http://localhost:5050/package/getPackageById/${id}`, config)
      .then((response) => {
        const data = response.data;
        setPackageId(data.packageId);
        setPackageName(data.packageName);
        setDescription(data.description || "");
        setPrice(data.price?.toString() || "");
        setEngineerName(data.engineerName || "");
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
        toast.error("Failed to fetch package details");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!packageName || !price) {
      toast.error("Package Name and Price are required.");
      return;
    }

    const updateDTO = {
      packageName, // you can edit packageName as per your note, or omit if not allowed
      description,
      price: parseFloat(price),
      // Engineer info is NOT sent as it's not editable
    };

    axios
      .put(`http://localhost:5050/package/updatePackageById/${packageId}`, updateDTO, config)
      .then(() => {
        toast.success("Package updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewpackages"); // Redirect after success
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to update package:", error);
        toast.error("Failed to update package.");
      });
  };

  return (
    <Admin>
      <ToastContainer />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            border: "2px solid #f3d70b",
            backgroundColor: "#f4f4f9",
            color: "black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 className="text-center mb-4">Edit Package</h2>
          <form onSubmit={handleSubmit}>
            {/* Package Name */}
            <div className="mb-3">
              <label>Package Name:</label>
              <input
                type="text"
                className="form-control"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label>Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ height: "30px" }}
                required
                step="0.01"
                min="0"
              />
            </div>

            {/* Engineer Name - Readonly */}
            <div className="mb-3">
              <label>Engineer:</label>
              <input
                type="text"
                className="form-control"
                value={engineerName}
                readOnly
                style={{ height: "30px", backgroundColor: "#e9ecef" }}
              />
            </div>

            {/* Submit Button */}
            <div className="mb-3 w-100">
              <button type="submit" className="btn btn-warning w-100">
                Update Package
              </button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default EditPackage;
