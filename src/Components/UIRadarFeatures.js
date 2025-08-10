import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UIRadarFeatures.css";

const UIRadarFeatures = () => {
  return (
    <div className="container my-5 text-center">
      {/* Info Section */}
      <div className="mb-4">
        <h2 className="feature-title">UIRadar Analytics</h2>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
          UIRadar provides advanced UI analytics tools to help you understand 
          and optimize your user experience with cutting-edge visual insights.
        </p>
      </div>

      {/* Features Row */}
      <div className="row g-4">
        {[{
          src: "../assests/img3.png",
          alt: "Heatmap Generation",
          title: "Heatmap Generation",
          desc: "Visualize user clicks and engagement hotspots instantly."
        }, {
          src: "../assests/img2.png",
          alt: "Eye Tracking",
          title: "Eye Tracking",
          desc: "See exactly where your users are focusing their attention."
        }, {
          src: "../assests/img1.png",
          alt: "UI Analysis",
          title: "In-depth Analysis",
          desc: "Get actionable insights to improve your design and conversions."
        }].map((feature, index) => (
          <div className="col-md-4" key={index}>
            <div className="card feature-card h-100 shadow-sm">
              <img
                src={feature.src}
                alt={feature.alt}
                className="card-img-top feature-image"
              />
              <div className="card-body">
                <h5 className="card-title">{feature.title}</h5>
                <p className="card-text">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learn More Button */}
      <div className="mt-4">
        <button className="btn btn-primary px-4">Learn More</button>
      </div>
    </div>
  );
};

export default UIRadarFeatures;
