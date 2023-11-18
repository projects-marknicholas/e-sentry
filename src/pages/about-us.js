import React, { useEffect } from 'react';

function AboutUs() {
  // Set document title and scroll to top on component mount
  useEffect(() => {
    document.title = "About Us | E-Sentry - Laguna State Polytechnic University";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Banner section */}
      <div className='banner sentry'>
        <div className='banner-title'>
          <h1>About Us</h1>
          <span>Who we are?</span>
        </div>
      </div>
      {/* Description section */}
      <div className='description'>
        <p>
          Welcome to Ecoinformatics LSPU-LB, where we are dedicated to advancing sustainable development and ensuring the 
          responsible management of lakes and aquatic environments. Our commitment stems from a deep understanding of the significant 
          socioeconomic benefits that lakes provide, contributing to ecological goods and services that enhance livelihoods and social 
          welfare.<br/><br/>
        </p>

        <h1>Our Mission</h1>
        <p>
          At Ecoinformatics LSPU-LB, we recognize the delicate balance between harnessing the opportunities lakes offer, 
          such as aquaculture and ecotourism, and ensuring the long-term health of these vital ecosystems. Our mission is to implement 
          critical and effective management strategies that optimize ecosystem services and promote the sustainable utilization of aquatic 
          resources.<br/><br/>
        </p>
        
        <h1>Why Lakes Matter</h1>
        <p>
          Lakes play a crucial role in supporting in-lake activities that address food and economic security. However, the impact of 
          industries like aquaculture on water quality requires careful consideration. We strive to mitigate these impacts through 
          the adoption of the Ecosystem Approach to Aquaculture (EAA), a strategic framework that prioritizes the optimal ecological 
          functioning and integrity of water environments.<br/><br/>
        </p>
        
        <h1>Our Approach</h1>
        <p>
          At Ecoinformatics LSPU-LB, we focus on predictive estimation of ecological carrying capacity (CC) as a key component of the EAA. 
          Through robust CC models, we determine the upper limits for aquaculture, ensuring sustainable practices that avoid unacceptable 
          changes to ecosystems and social structures.<br/><br/>
        </p>
        
        <h1>Innovation Through Technology</h1>
        <p>
          Our proposed project involves the development of an intelligent system based on deep learning algorithms. This system aims to 
          enhance water quality monitoring, using the latest advancements in artificial intelligence. By integrating this system with our 
          existing Sensing Environmental Parameters through Telemetry (SENTRY) platform, we are expanding its capabilities from real-time 
          data acquisition to predictive modeling of ecological carrying capacity.<br/><br/>
        </p>
        
        <h1>Sustainability and Impact</h1>
        <p>
          We believe that our AI innovations will contribute to sustainable development frameworks, providing valuable tools for lake 
          regulatory agencies and local government units. The outcomes of our projects align with global initiatives such as the 
          Sustainable Development Goals (SDGs), the Sendai Framework for Disaster Risk Reduction (DRR), and the Paris Climate Agreement.<br/><br/>
        </p>
        
        <h1>Join Us in Preserving Our Lakes</h1>
        <p>
          At Ecoinformatics LSPU-LB, we invite you to join us on this journey of responsible lake management and industrial development. 
          Together, we can ensure the longevity of these vital ecosystems, promote sustainable practices, and contribute to a healthier 
          environment for current and future generations.<br/><br/>
        </p>


        <span></span>
        {/*Image and video tags
        <img alt=''/>
        <video controls>
          <source src type="video/mp4" />
        </video>
        */}
      </div>
    </div>
  );
}

export default AboutUs;
