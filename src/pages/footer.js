import React from 'react';
import Weather from './weather';
import footerLogo from '../assets/img/favicon.png';
import { Link } from 'react-router-dom';

/**
 * Footer component for the application.
 * Provides navigation links, information about the project, and copyright details.
 *
 * @returns {JSX.Element} Footer component.
 */
function Footer() {
  return (
    <footer>
      {/* Project Information Section */}
      <div className='footer-item'>
        <div className='footer-flex'>
          {/* Left Section - Project Logo */}
          <div className='footer-left'>
            <img src={footerLogo} alt='footer-logo' />
          </div>
          {/* Right Section - Project Title and Description */}
          <div className='footer-right'>
            <h1>E-Sentry</h1>
            <p>
              Enhanced Sensing Environmental Parameters through Telemetry
              (E-Sentry): Integration of Predictive Environmental Models using
              Deep Learning Analytics in the System Implementation-Design
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links Sections */}
      <div className='footer-item'>
        {/* Links Section */}
        <h1>Links</h1>
        <Link to="/">Home</Link>
        <Link to="/about-sentry">About Sentry</Link>
        <Link to="/about-us">About Us</Link>
      </div>

      <div className='footer-item'>
        {/* Analysis Section */}
        <h1>Analysis</h1>
        <Link to="/analysis/water-quality">Water Quality</Link>
        <Link to="/analysis/temperature">Temperature</Link>
        <Link to="/analysis/ph">pH</Link>
        <Link to="/analysis/specific-conductance">Specific Conductance</Link>
        <Link to="/analysis/chlorophyll">Chlorophyll</Link>
        <Link to="/analysis/nitrate">Nitrate</Link>
        <Link to="/analysis/turbidity">Turbidity</Link>
      </div>

      <div className='footer-item'>
        {/* Security Section */}
        <h1>Security</h1>
        <Link to="">Terms & Conditions</Link>
        <Link to="">Privacy Policy</Link>
      </div>

      {/* Copyright Section */}
      <div className='footer-copyright'>
        © 2023 Laguna State Polytechnic University - Designed & Developed by{' '}
        {/* External Link to Developer's Facebook Profile */}
        <Link
          to="https://www.facebook.com/nicholas.razon.37"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mark Nicholas Razon
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
