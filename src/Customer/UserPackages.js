import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";

function UserPackages() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const customerId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!customerId) {
      setError("Please login to view your packages.");
      setLoading(false);
      return;
    }

    const fetchPayments = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const res = await axios.get(
          `http://localhost:5050/customer/getPayment/${customerId}`,
          config
        );
        setPayments(res.data);
      } catch (err) {
        setError("Failed to fetch purchased packages.");
        toast.error("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [customerId]);

  if (loading) return <p style={{ color: "white" }}>Loading your packages...</p>;
  if (error) return <p style={{ color: "#feb47b" }}>{error}</p>;
  if (payments.length === 0) return <p style={{ color: "white" }}>No purchased packages found.</p>;

  return (
    <>
    <CustomerNavbar />
    
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <ToastContainer />
      <h2 className="mb-4 text-center" style={{ color: "#feb47b" }}>
        Your Purchased Packages
      </h2>

      <div className="table-responsive">
        <table
          className="table"
          style={{ color: "white", borderCollapse: "separate", borderSpacing: "0 10px" }}
        >
          <thead style={{ backgroundColor: "#feb47b", color: "black" }}>
            <tr>
              <th>Payment ID</th>
              <th>Payment Date</th>
              <th>Customer Name</th>
              <th>Package Name</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr
                key={pay.paymentId}
                style={{
                  backgroundColor: "#222",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  display: "table-row",
                  boxShadow: "0 2px 5px rgba(254, 180, 123, 0.5)",
                }}
              >
                <td>{pay.paymentId}</td>
                <td>{pay.paymentDate ? new Date(pay.paymentDate).toLocaleDateString() : "-"}</td>
                <td>{pay.customerName}</td>
                <td>{pay.packageName}</td>
                <td>₹{pay.amount?.toFixed(2)}</td>
                <td
                  style={{
                    color:
                      pay.paymentStatus?.toLowerCase() === "paid"
                        ? "#57d500"
                        : "#feb47b",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {pay.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default UserPackages;
