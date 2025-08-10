import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";

function CreateRequest() {
  const navigate = useNavigate();
  const userId = Number(sessionStorage.getItem("userId"));
  const token = sessionStorage.getItem("jwtToken");

  const [engineers, setEngineers] = useState([]);
  const [hasPayment, setHasPayment] = useState(null); // null = loading, true/false = status
  const [selectedEngineerId, setSelectedEngineerId] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerId = sessionStorage.getItem("userId");
  // Check payment history on mount
  useEffect(() => {
    if (!userId) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`http://localhost:5050/customer/getPayment/${userId}`, config)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setHasPayment(true);
          fetchEngineers();
        } else {
          setHasPayment(false);
        }
      })
      .catch(() => setHasPayment(false));
  }, [userId, navigate, token]);

  // Fetch engineers if payment exists
  const fetchEngineers = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(
        `http://localhost:5050/customer/engineersByCustomer/${customerId}`,
        config
      )
      .then((res) => setEngineers(res.data))
      .catch(() => toast.error("Failed to load engineers"));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEngineerId || !description || !file) {
      toast.warn("Please fill all fields and attach a file");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("CustomerId", userId);
      formData.append("EngineerId", selectedEngineerId);
      formData.append("Description", description);
      formData.append("File", file);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(
        "http://localhost:5050/serviceRequest/create",
        formData,
        config
      );

      toast.success(res.data.message || "Request created successfully!");
      setTimeout(() => navigate("/viewRequests"), 2000);
    } catch (error) {
      toast.error("Failed to create request. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasPayment === null) return <p>Loading...</p>;

  if (hasPayment === false) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center" role="alert">
          You need to buy a package before creating a service request.
          <br />
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/")}
          >
            View Packages
          </button>
        </div>
      </div>
    );
  }

  // Render form if payment exists
  return (
    <>
      <CustomerNavbar />

      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <ToastContainer />
        <div className="card shadow p-4">
          <h2 className="mb-4 text-center fw-bold">Create Service Request</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label
                htmlFor="engineerSelect"
                className="form-label fw-semibold"
              >
                Select Engineer
              </label>
              <select
                id="engineerSelect"
                className="form-select"
                value={selectedEngineerId}
                onChange={(e) => setSelectedEngineerId(e.target.value)}
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

            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-semibold">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your request here..."
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="fileUpload" className="form-label fw-semibold">
                Upload File
              </label>
              <input
                id="fileUpload"
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 py-2 fw-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Request"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateRequest;
