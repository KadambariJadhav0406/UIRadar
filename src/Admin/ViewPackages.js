import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewPackages.css";
import Admin from "./Admin";

function ViewPackages() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const res = await axios.get(
          "http://localhost:5050/package/getAllPackages",
          config
        );
        setPackages(res.data || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, []);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editpackage/${id}`);
    } else {
      console.error("Package ID is undefined");
    }
  };

  return (
    <Admin>
      <div className="view-products-container">
        <h3>View Packages</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Engineer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <tr key={pkg.packageId}>
                  <td>{pkg.packageName}</td>
                  <td>{pkg.description}</td>
                  <td>{pkg.price}</td>
                  <td>{pkg.engineerName}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(pkg.packageId)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No packages available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewPackages;
