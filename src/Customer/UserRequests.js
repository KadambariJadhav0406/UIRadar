import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../Components/CustomerNavbar";

function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get(
          `http://localhost:5050/ServiceRequest/customer/${userId}`,
          config
        );
        setRequests(response.data);
      } catch (err) {
        setError("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

const handleDownload = async (requestId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
      responseType: "blob", // Important for binary data
    };

    const response = await axios.get(
      `http://localhost:5050/download/engineerFile/${requestId}`,
      config
    );

    // Extract filename from header
    const contentDisposition = response.headers["content-disposition"];
    let fileName = "downloaded_file";

    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (fileNameMatch && fileNameMatch.length > 1) {
        fileName = decodeURIComponent(fileNameMatch[1]);
      }
    }

    // Create blob with correct MIME type
    const contentType = response.headers["content-type"] || "application/octet-stream";
    const blob = new Blob([response.data], { type: contentType });

    // Trigger download
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
    console.error("Download error:", error);
    alert("Failed to download file.");
  }
};



  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "3rem", color: "#feb47b" }}>
        Loading your requests...
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", marginTop: "3rem", color: "#ff6f61" }}>
        {error}
      </p>
    );

  if (requests.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "3rem", color: "#feb47b" }}>
        You have no service requests.
      </p>
    );

  return (
    <>
      <CustomerNavbar />
      <div
        style={{
          margin: "2rem auto",
          maxWidth: "900px",
          color: "#fff",
          backgroundColor: "#fefcfcff",
          borderRadius: "12px",
          padding: "1.5rem",
          border: "2px solid black",
        }}
      >
        <h2
          style={{
            color: "#feb47b",
            textAlign: "center",
            marginBottom: "1.5rem",
            fontWeight: "700",
            letterSpacing: "1.5px",
          }}
        >
          Your Service Requests
        </h2>

        <table
          className="table"
          style={{
            color: "#fff",
            borderCollapse: "separate",
            borderSpacing: "0 10px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#feb47b",
                color: "#000",
                borderRadius: "10px",
                border: "2px solid black",
              }}
            >
              <th style={{ borderTopLeftRadius: "10px", padding: "12px" }}>
                Request ID
              </th>
              <th>Description</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Engineer ID</th>
              <th style={{ borderTopRightRadius: "10px" }}>Download File</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr
                key={req.requestId}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#e1a44eff" : "#ecc39eff",
                  borderRadius: "10px",
                  boxShadow: "inset 0 0 5px #000",
                }}
              >
                <td style={{ padding: "10px", verticalAlign: "middle" }}>
                  {req.requestId}
                </td>
                <td style={{ padding: "10px", verticalAlign: "middle" }}>
                  {req.description}
                </td>
                <td style={{ padding: "10px", verticalAlign: "middle" }}>
                  {req.requestDate
                    ? new Date(req.requestDate).toLocaleDateString()
                    : "-"}
                </td>
                <td
                  style={{
                    padding: "10px",
                    verticalAlign: "middle",
                    textTransform: "capitalize",
                    fontWeight: "600",
                    color:
                      req.status?.toLowerCase() === "completed"
                        ? "#57d500"
                        : "#feb47b",
                  }}
                >
                  {req.status}
                </td>
                <td style={{ padding: "10px", verticalAlign: "middle" }}>
                  {req.engineerId}
                </td>
                <td style={{ padding: "10px", verticalAlign: "middle" }}>
                  <button
                    disabled={req.status?.toLowerCase() !== "completed"}
                    onClick={() => handleDownload(req.requestId)}
                    className={`btn btn-sm ${
                      req.status?.toLowerCase() === "completed"
                        ? "btn-warning"
                        : "btn-secondary"
                    }`}
                    style={{
                      fontWeight: "600",
                      borderRadius: "20px",
                      minWidth: "90px",
                      cursor:
                        req.status?.toLowerCase() === "completed"
                          ? "pointer"
                          : "not-allowed",
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserRequests;
