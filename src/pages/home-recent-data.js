import React, { useEffect, useState } from 'react';
import axios from 'axios';
import waterSvg from '../assets/svg/water.svg';
import temparatureSvg from '../assets/svg/temparature.svg';
import pHSvg from '../assets/svg/ph.svg';
import conductanceSvg from '../assets/svg/conductance.svg';
import chlorophyllSvg from '../assets/svg/chlorophyll.svg';
import nitrateSvg from '../assets/svg/nitrate.svg';
import turbiditySvg from '../assets/svg/turbidity.svg';
import scoreSvg from '../assets/svg/score.svg';

/**
 * Home component displays an analysis grid with real-time and predicted environmental data.
 *
 * @returns {JSX.Element} Home component.
 */
function Home() {
  // State hooks to store data
  const [data, setData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [predictedDataTwo, setPredictedDataTwo] = useState([]);
  const [predictedWaterQuality, setPredictedWaterQuality] = useState([]);

  // Fetch data from APIs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter');
        const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSecondData = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/loggertwos');
        setSecondData(response.data);
      } catch (error) {
        console.error('Error fetching second data:', error);
      }
    };

    const fetchPrediction = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/preds');
        setPredictedData(response.data);
      } catch (error) {
        console.error('Error fetching prediction data:', error);
      }
    };

    const fetchSecondPrediction = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/predstwo');
        setPredictedDataTwo(response.data);
      } catch (error) {
        console.error('Error fetching second prediction data:', error);
      }
    };

    const fetchWqiPrediction = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/wqipreds');
        setPredictedWaterQuality(response.data);
      } catch (error) {
        console.error('Error fetching water quality prediction data:', error);
      }
    };

    // Execute all fetch functions
    fetchPrediction();
    fetchData();
    fetchSecondData();
    fetchSecondPrediction();
    fetchWqiPrediction();
  }, []);

  // Helper function to extract data from an array based on a key
  const extractData = (dataArray, key) => {
    return dataArray.map((data) => data[key]);
  };

  // Helper function to extract relevant prediction data
  const extractPredictionData = (dataArray) => {
    return dataArray.map((data) => ({
      Prediction: data.Prediction,
      PredScore: data.PredScore,
    }));
  };
  const predictionData = extractPredictionData(predictedWaterQuality);
  const waterQualityPrediction = predictionData.length > 0 ? predictionData[0].Prediction : '';
  const waterQualityPredScore = predictionData.length > 0 ? predictionData[0].PredScore : '';

  // Extracted data arrays
  const date = extractData(data, 'Date');
  const temp = extractData(data, 'Temperature');
  const ph = extractData(data, 'PH');
  const SPCond = extractData(data, 'SPCond');
  const CHL = extractData(secondData, 'CHL');
  const NTR = extractData(data, 'NITRATE');
  const TURB = extractData(data, 'TURBIDITY');

  // Function to get the most recent value for a parameter
  const getRecentValue = (parameterData) => {
    if (parameterData.length > 0) {
      return parameterData[parameterData.length - 1];
    }
    return '0'; // Display '0' if no data is available
  };

  // Function to get data for a specific analysis
  const getAnalysisData = (analysis) => {
    switch (analysis) {
      case 'Temperature':
        return temp;
      case 'PH':
        return ph;
      case 'Specific Conductance':
        return SPCond;
      case 'Chlorophyll':
        return CHL;
      case 'Nitrate':
        return NTR;
      case 'Turbidity':
        return TURB;
      default:
        return [];
    }
  };

  return (
    <div className='hf-analysis-grid'>
      {/* Water Quality Analysis */}
      <div className='hf-analysis-item'>
        <div className='hf-analyze'>
          <p>Water Quality</p>
          <h1 className={waterQualityPrediction}>{waterQualityPrediction}</h1>
          <img src={waterSvg} alt='water-quality' />
        </div>
      </div>

      {/* Quality Score Analysis */}
      <div className='hf-analysis-item'>
        <div className='hf-analyze'>
          <p>Quality Score</p>
          <h1>{waterQualityPredScore}</h1>
          <img src={scoreSvg} alt='water-quality' />
        </div>
      </div>

      {/* Temperature Analysis */}
      <div className='hf-analysis-item'>
        <div className='hf-analyze'>
          <p>Temperature</p>
          <h1>{Number(getRecentValue(getAnalysisData('Temperature'))).toFixed(2)}</h1>
          <img src={temparatureSvg} alt='temperature' />
        </div>
      </div>

      {/* pH Analysis */}
      <div className='hf-analysis-item'>
        <div className='hf-analyze'>
          <p>pH</p>
          <h1>{Number(getRecentValue(getAnalysisData('PH'))).toFixed(2)}</h1>
          <img src={pHSvg} alt='power-hydrogen' />
        </div>
      </div>

      {/* Specific Conductance Analysis */}
      <div className='hf-analysis-item'>
        <div className='hf-analyze'>
          <p>Specific Conductance</p>
          <h1>{Number(getRecentValue(getAnalysisData('Specific Conductance'))).toFixed(2)}</h1>
          <img src={conductanceSvg} alt='conductance' />
        </div>
      </div>

      {/* Chlorophyll Analysis */}
      <div className='hf-analysis-item'>
        <div className='hf-analyze'>
          <p>Chlorophyll</p>
          <h1>{Number(getRecentValue(getAnalysisData('Chlorophyll'))).toFixed(2)}</h1>
          <img src={chlorophyllSvg} alt='chlorophyll' />
        </div>
      </div>

      {/* Nitrate Analysis */}
      <div className='hf-analysis-item'>
        <div className='hf-analyze'>
          <p>Nitrate</p>
          <h1>{Number(getRecentValue(getAnalysisData('Nitrate'))).toFixed(2)}</h1>
          <img src={nitrateSvg} alt='nitrate' />
        </div>
      </div>

      {/* Turbidity Analysis */}
      <div className='hf-analysis-item'>
        <div className='hf-analyze'>
          <p>Turbidity</p>
          <h1>{Number(getRecentValue(getAnalysisData('Turbidity'))).toFixed(2)}</h1>
          <img src={turbiditySvg} alt='turbidity' />
        </div>
      </div>
    </div>
  );
}

export default Home;
