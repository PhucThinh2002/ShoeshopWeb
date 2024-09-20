import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/scss/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="bottom">
            <h3>GET HELP</h3>
            <Link to="/">Home</Link>
            <Link to="/nike">Nike</Link>
            <Link to="/adidas">Adidas</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="vertical-divider"></div>
          <div className="bottom">
            <h3>SUPPORT</h3>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/help">Help</Link>
            <Link to="/phone">Phone</Link>
          </div>
          <div className="vertical-divider"></div> 
          <div className="bottom">
            <h3>REGISTER</h3>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 Cybersoft All Rights Reserved | Design Theme by Duong Phuc Thinh
        </div>
      </div>
    </footer>
  );
};

export default Footer;
