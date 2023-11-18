import React, { useEffect } from 'react';
import Weather from './weather';
import logo from '../assets/img/favicon.png';
import { Link } from 'react-router-dom';
import HomeMap from './home-map';
import Water from '../pages/water';
import RecentData from '../pages/home-recent-data';

/**
 * Home component represents the main landing page of the application.
 * It includes an overview dashboard, a weather section, recent data display,
 * and a surface map analysis section.
 *
 * @returns {JSX.Element} Home component.
 */
function Home() {
  // Set document title and scroll to top on component mount
  useEffect(() => {
    document.title = "E-Sentry | Laguna State Polytechnic University";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      {/* Overview Dashboard */}
      <div className='overview-dash'>
        {/* Left Section of Overview - University Profile */}
        <div className='over-left'>
          <div className='overview-profile'>
            {/* University Logo */}
            <img src={logo} alt="lspu-logo"/>
            <span>
              {/* University Name and Campus */}
              <h1>E-Sentry</h1>
              <p>Laguna State Polytechnic University - Los Baños Campus</p>
            </span>
          </div>
        </div>
        {/* Right Section of Overview - Weather Component */}
        <div className='over-right'>
          <Weather/>
        </div>
      </div>

      {/* Main Content */}
      <div className='home-page'>
        {/* Home Flex Container */}
        <div className='home-flex'>
          {/* Right Section - Recent Data Display */}
          <div className='hf-right'>
            <RecentData/>
          </div>
          {/* Left Section - Surface Map Analysis */}
          <div className='hf-left'>
            <div className='home-map-analysis'>
              <div className='home-map-flex'>
                {/* Title and Link to Surface Map Page */}
                <h1>Surface Map Analysis</h1>
                <Link to="/map">View surface map →</Link>
              </div>
              {/* Main Map Section */}
              <div className='main-map'>
                <div className='main-map-left'>
                  {/* HomeMap Component */}
                  <HomeMap/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Water Component */}
        <Water/>
      </div>
    </div>
  );
}

export default Home;
