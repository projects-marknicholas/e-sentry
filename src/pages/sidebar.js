import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import homeSvg from '../assets/svg/home.svg';
import aboutSentrySvg from '../assets/svg/about-sentry.svg';
import aboutUsSvg from '../assets/svg/about-us.svg';
import loggerSvg from '../assets/svg/logger.svg';

/**
 * Sidebar component represents the navigation sidebar of the application.
 * It provides links to various sections such as Home, About Sentry, and About Us.
 *
 * @returns {JSX.Element} Sidebar component.
 */
function Sidebar() {
  // State to manage the open/close state of the sidebar
  const [isOpen, setIsOpen] = useState(false);
  const [showLoggers, setShowLoggers] = useState(false);

  // Get the current location using react-router's useLocation hook
  const location = useLocation();

  // Function to toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Use useEffect to update the state when the location changes
  useEffect(() => {
    // Show Loggers only if the Home, Logger 1, or Logger 2 button is active
    setShowLoggers(
      location.pathname === '/' ||
      location.pathname === '/logger1' ||
      location.pathname === '/logger2'
    );
  }, [location.pathname]);

  // Function to determine the CSS class for an active navigation link
  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Toggle button to open/close the sidebar */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      {/* Navigation links */}
      <nav>
        <ul>
          {/* Home Link */}
          <li className={`hover-home ${getNavLinkClass('/')}`}>
            <Link to="/" onClick={closeSidebar}>
              <img src={homeSvg} alt="Home" />
              <p className={`${isOpen ? 'show' : 'hide'}`}>Home</p>
            </Link>
          </li>
          {showLoggers && (
            <>
              {/* Logger 1 Link */}
              <li className={`hover-logger ${getNavLinkClass('/logger1')}`}>
                <Link to="/logger1" onClick={closeSidebar}>
                  <img src={loggerSvg} alt="Logger1" />
                  <p className={`${isOpen ? 'show' : 'hide'}`}>Logger 1</p>
                </Link>
              </li>
              {/* Logger 2 Link */}
              <li className={`hover-logger ${getNavLinkClass('/logger2')}`}>
                <Link to="/logger2" onClick={closeSidebar}>
                  <img src={loggerSvg} alt="Logger2" />
                  <p className={`${isOpen ? 'show' : 'hide'}`}>Logger 2</p>
                </Link>
              </li>
            </>
          )}
          {/* About Sentry Link */}
          <li className={`hover-about-sentry ${getNavLinkClass('/about-sentry')}`}>
            <Link to="/about-sentry" onClick={closeSidebar}>
              <img src={aboutSentrySvg} alt="About Sentry" />
              <p className={`${isOpen ? 'show' : 'hide'}`}>About Sentry</p>
            </Link>
          </li>
          {/* About Us Link */}
          <li className={`hover-about-us ${getNavLinkClass('/about-us')}`}>
            <Link to="/about-us" onClick={closeSidebar}>
              <img src={aboutUsSvg} alt="About Us" />
              <p className={`${isOpen ? 'show' : 'hide'}`}>About Us</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
