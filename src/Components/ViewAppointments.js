import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";
import { useNavigate } from "react-router-dom";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

    useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
    else if (sessionStorage.getItem("userRole") === "ENGINEER") {
    navigate("/engineer");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get(
          `http://localhost:5050/customer/getAppointmentsByUserId/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    fetchAppointments();
  }, []);

  const handleDownload = async (appointmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/customer/downloadDocument/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Construction_${appointmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Prescription downloaded successfully!");
    } catch (error) {
      console.error("Error downloading prescription:", error);
      toast.error("Failed to download prescription.");
    }
  };

  return (
    <div className="mt-5 ml-5 mr-5">
      <ToastContainer />
      <h2 className="text-center mb-4" style={{ color: "#f3d70b" }}>
        Your Appointments
      </h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead style={{ backgroundColor: "#f3d70b", color: "#000" }}>
            <tr>
              <th>Engineer Name</th>
              <th>Appointment Date</th>
              <th>Square foot(Area)</th>
              <th>BHK</th>
              <th>Floor</th>
              <th>landDescription</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt.appointmentDate + appt.engineerName}>
                  <td>{appt.engineerName}</td>
                  <td>{appt.appointmentDate}</td>
                  <td>{appt.sqft}</td>
                  <td>{appt.bhk}</td>
                  <td>{appt.floor}</td>
                  <td>{appt.landDescription}</td>
                  <td>{appt.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleDownload(appt.appointmentId)}
                      disabled={
                        appt.status !== "COMPLETED" 
                      }
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAppointments;
