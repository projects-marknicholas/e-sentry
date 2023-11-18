import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlotlyCharts from '../charts/PlotlyChartsSmall';
import BigPlotlyCharts from '../charts/PlotlyCharts';

/**
 * Water component fetches water quality and prediction data, allowing users to analyze and visualize the data.
 *
 * @returns {JSX.Element} Water component.
 */
function Water() {
  const [data, setData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [predictedDataTwo, setPredictedDataTwo] = useState([]);
  const [predictedQuality, setPredictedWaterQuality] = useState([]);
  const [filterOption, setFilterOption] = useState('Year');
  const [selectedAnalysis, setSelectedAnalysis] = useState('All');
  const prevFilterOption = useRef(filterOption);

  /**
   * Handles change in filter option.
   *
   * @param {Object} e - Event object.
   */
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  /**
   * Handles change in selected analysis.
   *
   * @param {Object} e - Event object.
   */
  const handleAnalysisChange = (e) => {
    setSelectedAnalysis(e.target.value);
  };

  useEffect(() => {
    let isMounted = true;

    /**
     * Fetches water quality data from the API.
     */
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter');
        const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    /**
     * Fetches additional data related to water quality.
     */
    const fetchSecondData = async () => {
      await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/loggertwos').then((res) => {
        setSecondData(res.data);
      });
    };

    /**
     * Fetches prediction data.
     */
    const fetchPrediction = async () => {
      await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/preds').then((res) => {
        setPredictedData(res.data);
      });
    };

    /**
     * Fetches additional prediction data.
     */
    const fetchSecondPrediction = async () => {
      await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/predstwo').then((res) => {
        setPredictedDataTwo(res.data);
      });
    };

    /**
     * Fetches water quality prediction data.
     */
    const fetchWqiPrediction = async () => {
      await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/wqipreds').then((res) => {
        setPredictedWaterQuality(res.data);
      });
    };

    /**
     * Fetches all necessary data.
     */
    const fetchAllData = async () => {
      await Promise.all([fetchPrediction(), fetchData(), fetchSecondData(), fetchSecondPrediction(), fetchWqiPrediction()]);
    };

    if (isMounted) {
      fetchAllData();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Extracts data from an array based on a given key.
   *
   * @param {Array} dataArray - The array of data.
   * @param {string} key - The key to extract.
   * @returns {Array} Extracted data array.
   */
  const extractData = (dataArray, key) => {
    return dataArray.map((data) => data[key]);
  };

  // Extracting data for various parameters
  const date = extractData(data, 'Date');
  const temp = extractData(data, 'Temperature');
  const ph = extractData(data, 'PH');
  const SPCond = extractData(data, 'SPCond');
  const CHL = extractData(secondData, 'CHL');
  const NTR = extractData(data, 'NITRATE');
  const TURB = extractData(data, 'TURBIDITY');

  // Extracting prediction data
  const predDate = extractData(predictedData, 'Date');
  const predTemp = extractData(predictedData, 'temp_pred');
  const upperTemp = extractData(predictedData, 'temp_upper');
  const lowerTemp = extractData(predictedData, 'temp_lower');

  const predPh = extractData(predictedData, 'ph_pred');
  const upperPh = extractData(predictedData, 'ph_upper');
  const lowerPh = extractData(predictedData, 'ph_lower');

  const predSc = extractData(predictedData, 'sc_pred');
  const upperSc = extractData(predictedData, 'sc_upper');
  const lowerSc = extractData(predictedData, 'sc_lower');

  const predCl = extractData(predictedDataTwo, 'cl_pred');
  const upperCl = extractData(predictedDataTwo, 'cl_upper');
  const lowerCl = extractData(predictedDataTwo, 'cl_lower');

  const predNt = extractData(predictedData, 'nt_pred');
  const upperNt = extractData(predictedData, 'nt_upper');
  const lowerNt = extractData(predictedData, 'nt_lower');

  const predTurb = extractData(predictedData, 'turb_pred');
  const upperTurb = extractData(predictedData, 'turb_upper');
  const lowerTurb = extractData(predictedData, 'turb_lower');

  // Extracting water quality prediction data
  const wqdate = extractData(predictedQuality, 'Date');
  const wqTemperature = extractData(predictedQuality, 'Temperature');
  const wqPH = extractData(predictedQuality, 'PH');
  const wqSPCond = extractData(predictedQuality, 'SPCond');
  const wqCHL = extractData(predictedQuality, 'CHL');
  const wqNT = extractData(predictedQuality, 'NITRATE');
  const wqTURB = extractData(predictedQuality, 'TURBIDITY');
  const wqPreds = extractData(predictedQuality, 'Prediction');
  const wqScore = extractData(predictedQuality, 'PredScore');

  /**
   * Gets analysis data based on the selected analysis.
   *
   * @param {string} analysis - The selected analysis.
   * @returns {Array} Analysis data.
   */
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

  /**
   * Gets prediction data based on the selected analysis.
   *
   * @param {string} analysis - The selected analysis.
   * @returns {Array} Prediction data.
   */
  const getPredictionData = (analysis) => {
    switch (analysis) {
      case 'Temperature':
        return temp;
      case 'PH':
        return ph;
      case 'Specific Conductance':
        return predSc;
      case 'Chlorophyll':
        return predCl;
      case 'Nitrate':
        return predNt;
      case 'Turbidity':
        return predTurb;
      default:
        return [];
    }
  };

  /**
   * Gets prediction date based on the selected analysis.
   *
   * @param {string} analysis - The selected analysis.
   * @returns {Array} Prediction date.
   */
  const getPredictionDate = (analysis) => {
    switch (analysis) {
      default:
        return predDate;
    }
  };

  /**
   * Gets upper bound data based on the selected analysis.
   *
   * @param {string} analysis - The selected analysis.
   * @returns {Array} Upper bound data.
   */
  const getUpperBound = (analysis) => {
    switch (analysis) {
      case 'Temperature':
        return upperTemp;
      case 'PH':
        return upperPh;
      case 'Specific Conductance':
        return upperSc;
      case 'Chlorophyll':
        return upperCl;
      case 'Nitrate':
        return upperNt;
      case 'Turbidity':
        return upperTurb;
      default:
        return [];
    }
  };

  /**
   * Gets lower bound data based on the selected analysis.
   *
   * @param {string} analysis - The selected analysis.
   * @returns {Array} Lower bound data.
   */
  const getLowerBound = (analysis) => {
    switch (analysis) {
      case 'Temperature':
        return lowerTemp;
      case 'PH':
        return lowerPh;
      case 'Specific Conductance':
        return lowerSc;
      case 'Chlorophyll':
        return lowerCl;
      case 'Nitrate':
        return lowerNt;
      case 'Turbidity':
        return lowerTurb;
      default:
        return [];
    }
  };

  return (
    <div className='analysis-header'>
      <div className='flex-header'>
        {/* Dropdown for selecting time range */}
        <div className='header-inputs'>
          <span>Filter by: </span>
          <select onChange={handleFilterChange} value={filterOption}>
            <option>Day</option>
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
        </div>

        {/* Dropdown for selecting analysis type */}
        <div className='header-inputs'>
          <select onChange={handleAnalysisChange} value={selectedAnalysis}>
            <option>All</option>
            <option>Water Quality</option>
            <option>Temperature</option>
            <option>PH</option>
            <option>Specific Conductance</option>
            <option>Chlorophyll</option>
            <option>Nitrate</option>
            <option>Turbidity</option>
          </select>
        </div>
      </div>

      {/* Conditional rendering based on selected analysis type */}
      {selectedAnalysis !== 'All' ? (
        <div className='whole-data-analyze'>
          {/* Display analysis information and visualization */}
          <p>
            {selectedAnalysis} filtered by <span>{filterOption}</span>
          </p>
          <div className='graph'>
            {/* Component for rendering big Plotly charts */}
            <BigPlotlyCharts
              data={data}
              parameter={selectedAnalysis}
              parameterX={date}
              parameterY={getAnalysisData(selectedAnalysis)}
              predY={getPredictionData(selectedAnalysis)}
              predX={getPredictionDate(selectedAnalysis)}
              upperBound={getUpperBound(selectedAnalysis)}
              lowerBound={getLowerBound(selectedAnalysis)}
              filterOption={filterOption}
            />
          </div>
        </div>
      ) : (
        <div className='data-analysis'>
          {/* Render individual analysis items for each type */}
          {/* Example: Temperature Analysis */}
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Temperature</h1>
                {/* Link to navigate to detailed analysis page */}
                <Link to='/analysis/temperature'>View →</Link>
              </div>
              <div className='graph'>
                {/* Component for rendering Plotly charts */}
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={data}
                    parameter='Temperature'
                    parameterX={date}
                    parameterY={temp}
                    predY={predTemp}
                    predX={predDate}
                    upperBound={upperTemp}
                    lowerBound={lowerTemp}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>PH</h1>
                <Link to="/analysis/ph">View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={data}
                    paramater="PH"
                    parameterX={date}
                    parameterY={ph}
                    predY={predPh}
                    predX={predDate}
                    upperBound={upperPh}
                    lowerBound={lowerPh}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Specific Conductance</h1>
                <Link to="/analysis/specific-conductance">View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={data}
                    paramater="Specific Conductance"
                    parameterX={date}
                    parameterY={SPCond}
                    predY={predSc}
                    predX={predDate}
                    upperBound={upperSc}
                    lowerBound={lowerSc}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Chlorophyll</h1>
                <Link to="/analysis/chlorophyll">View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={data}
                    paramater="Chlorophyll"
                    parameterX={date}
                    parameterY={CHL}
                    predY={predCl}
                    predX={predDate}
                    upperBound={upperCl}
                    lowerBound={lowerCl}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Nitrate</h1>
                <Link to="/analysis/nitrate">View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={data}
                    paramater="Nitrate"
                    parameterX={date}
                    parameterY={NTR}
                    predY={predNt}
                    predX={predDate}
                    upperBound={upperNt}
                    lowerBound={lowerNt}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Turbidity</h1>
                <Link to="/analysis/turbidity">View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts
                    data={data}
                    paramater="Turbidity"
                    parameterX={date}
                    parameterY={TURB}
                    predY={predTurb}
                    predX={predDate}
                    upperBound={upperTurb}
                    lowerBound={lowerTurb}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Water;
