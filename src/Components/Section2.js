import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Section2.css'; // Import custom CSS

function Section2() {
  return (
    <div className="section2-container py-4">
      <div className="position-relative section2-banner">
        {/* Banner Image */}
        <img
          src="../assests/image.jpeg" 
          alt="UIRadar Banner"
          className="img-fluid w-100 banner-img"
        />

        {/* Black Overlay */}
        <div className="overlay"></div>

        {/* Text on Banner */}
        <div className="banner-text text-white text-center px-3">
          <h2 className="banner-title mb-3">Why Choose UIRadar?</h2>
          <p className="banner-description lead">
            UIRadar is your go-to platform for understanding your users like never before.
            With heatmaps, eye tracking, and in-depth analytics, we help you optimize
            your interface for maximum engagement and conversions—all in one powerful dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section2;
