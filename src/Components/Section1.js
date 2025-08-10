import React from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Make sure react-toastify is installed and configured

function Section1() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    const token = sessionStorage.getItem("jwtToken");

    if (!token) {
      toast.error("Login to book appointment", { autoClose: 2500 });
    } else {
      navigate('/bookappointment');
    }
  };

  return (
    <div className="mycontainer my-5 mx-5">
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-6 col-12 mb-4 mb-md-0">
          <h2 className="mb-4 fw-bolder fs-1">BrickStore</h2>
          <p className="mb-4 me-5 fs-5">
            BrickStore is your trusted partner in building the home of your dreams. 
            We specialize in providing high-quality construction materials—from bricks, 
            cement, and steel to tiles, plumbing, and electrical supplies—all under one roof. 
            With a deep understanding of modern construction needs and decades of industry 
            experience, BrickStore is committed to simplifying the home-building process. 
            Our network of reliable vendors, expert guidance, and efficient logistics ensures 
            timely delivery and top-grade materials, no matter the scale of your project.
            Whether you're constructing a new house or renovating your space, 
            BrickStore empowers homeowners, builders, and contractors to build smarter, 
            faster, and more affordably.
          </p>
          <button
            className="btn btn-primary btn-lg w-30"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
        </div>

        <div className="col-lg-5 col-md-6 col-12">
          <div className="row g-2">
            <img
              src="./assests/img1.jpeg"
              alt="BrickStore"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
