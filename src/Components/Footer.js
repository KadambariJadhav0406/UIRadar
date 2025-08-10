import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-light text-dark pt-5">
      <div className="container-fluid">
        <div className="row">
          {/* About UIRadar */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3" style={{ color: '#ff7e5f', fontWeight: 'bold' }}>About UIRadar</h5>
            <p>
              <strong>UIRadar</strong> is your ultimate platform for understanding and optimizing 
              your user interface. From heatmaps to eye tracking and in-depth analytics, 
              we help you maximize engagement and conversions with actionable insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3" style={{ color: '#ff7e5f', fontWeight: 'bold' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-decoration-none text-dark">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-decoration-none text-dark">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/features" className="text-decoration-none text-dark">Features</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-decoration-none text-dark">Contact</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="mb-3" style={{ color: '#ff7e5f', fontWeight: 'bold' }}>Contact</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-map-marker-alt me-2"></i> UIRadar HQ, Tech Avenue, Bangalore, India
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i> support@uiradar.com
              </li>
              <li>
                <i className="fas fa-phone me-2"></i> +91-98765-43210
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="text-center mb-3">
          <a href="#" className="text-dark me-3"><i className="fab fa-facebook fa-lg"></i></a>
          <a href="#" className="text-dark me-3"><i className="fab fa-twitter fa-lg"></i></a>
          <a href="#" className="text-dark me-3"><i className="fab fa-instagram fa-lg"></i></a>
          <a href="#" className="text-dark me-3"><i className="fab fa-linkedin fa-lg"></i></a>
          <a href="#" className="text-dark"><i className="fab fa-github fa-lg"></i></a>
        </div>

        {/* Copyright */}
        <div className="text-center py-3 border-top" style={{ color: '#555' }}>
          &copy; {new Date().getFullYear()} UIRadar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
