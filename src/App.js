import React from 'react'
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import AboutSentry from './pages/about-sentry'
import AboutUs from './pages/about-us'
import Water from './pages/water'
import Map from './pages/map'
import Weather from './pages/weather'
import Sidebar from './pages/sidebar'
import Footer from './pages/footer'
import DataAnalysis from './pages/analysis'
import Logger1 from './pages/logger1'
import Logger2 from './pages/logger2'

function App() {
  return (
    <div className='main-section'>
      <Router>
        <Sidebar/>
        <div className='main-dash'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-sentry" element={<AboutSentry />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/water" element={<Water />} />
            <Route path="/map" element={<Map />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/logger1" element={<Logger1 />} />
            <Route path="/logger2" element={<Logger2 />} />
            <Route path="/analysis/:labelName" element={<DataAnalysis />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
