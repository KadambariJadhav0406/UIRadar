import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAppointmentsE.css";
import Engineer from "./Engineer";
import { useNavigate } from "react-router-dom";

function ViewAppointmentsE() {
  const [appointments, setAppointments] = useState([]);
  const engineerId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:5050/serviceRequest/engineer/${engineerId}`,
          config
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [engineerId]);

const handleDownload = async (requestId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
      responseType: "blob", // ensure binary data
    };

    const res = await axios.get(
      `http://localhost:5050/download/customerFile/${requestId}`,
      config
    );

    // Read filename from Content-Disposition header
    const contentDisposition = res.headers["content-disposition"];
    let fileName = `customerFile_${requestId}`;

    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (fileNameMatch && fileNameMatch.length > 1) {
        fileName = decodeURIComponent(fileNameMatch[1]);
      }
    }

    // Use backend's content type for Blob
    const blob = new Blob([res.data], {
      type: res.headers["content-type"] || "application/octet-stream",
    });

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};



  const handleUpload = async (requestId, file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(
        `http://localhost:5050/uploadFileByEngineer/${requestId}`,
        formData,
        config
      );
      alert("File uploaded successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Engineer>
      <div className="view-appointments-container">
        <h3>View Appointments</h3>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Description</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Customer File</th>
              <th>Engineer Upload</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.requestId}>
                  <td>{appointment.requestId}</td>
                  <td>{appointment.description}</td>
                  <td>{appointment.requestDate}</td>
                  <td>{appointment.status}</td>
                  <td>
                    <button
                      className="download-btn"
                      onClick={() => handleDownload(appointment.requestId)}
                    >
                      Download
                    </button>
                  </td>
                  <td>
                    <input
                      type="file"
                      id={`fileInput-${appointment.requestId}`}
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleUpload(appointment.requestId, e.target.files[0])
                      }
                    />
                    <button
                      className="upload-btn"
                      disabled={appointment.status === "Completed"}
                      onClick={() =>
                        document
                          .getElementById(`fileInput-${appointment.requestId}`)
                          .click()
                      }
                    >
                      Upload
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No appointments available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Engineer>
  );
}

export default ViewAppointmentsE;
