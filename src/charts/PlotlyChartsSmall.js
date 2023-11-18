import React from "react";
import Plot from "react-plotly.js";

/**
 * PlotlyCharts component displays a Plotly line chart with data, prediction, upper and lower bounds.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.parameter - Parameter to be displayed on the chart.
 * @param {Array} props.parameterX - X-axis data for the chart.
 * @param {Array} props.parameterY - Y-axis data for the chart.
 * @param {Array} props.predX - X-axis data for prediction.
 * @param {Array} props.predY - Y-axis data for prediction.
 * @param {Array} props.upperBound - Y-axis data for the upper bound.
 * @param {Array} props.lowerBound - Y-axis data for the lower bound.
 * @param {string} props.filterOption - Filter option for data.
 * @param {string} props.className - Additional class name for styling.
 * @returns {JSX.Element} Plotly line chart component.
 */
const PlotlyCharts = ({
  parameter,
  parameterX,
  parameterY,
  predX,
  predY,
  upperBound,
  lowerBound,
  filterOption,
  className
}) => {
  // Filter data based on the selected filter option
  const filteredData = parameterX.filter((date, index) => {
    switch (filterOption) {
      case "Day":
        return Date.now() - new Date(date).getTime() < 24 * 60 * 60 * 1000;
      case "Week":
        return Date.now() - new Date(date).getTime() < 7 * 24 * 60 * 60 * 1000;
      case "Month":
        return Date.now() - new Date(date).getTime() < 30 * 24 * 60 * 60 * 1000;
      case "Year":
        return Date.now() - new Date(date).getTime() < 365 * 24 * 60 * 60 * 1000;
      default:
        return new Date(date).getTime() < 30 * 24 * 60 * 60 * 1000;
    }
  });

  // Define data for the Plotly chart
  const data = [
    {
      x: filteredData,
      y: parameterY.slice(0, filteredData.length),
      type: "scatter",
      mode: "lines+markers",
      marker: {
        size: 4,
      },
      name: "Data",
    },
    {
      x: predX,
      y: predY,
      type: "scatter",
      mode: "lines",
      name: "Prediction",
    },
    {
      x: predX,
      y: upperBound,
      type: "scatter",
      mode: "lines",
      line: { color: "rgba(0, 0, 0, 0)" },
      name: "Upper Bound",
      fill: "tonexty",
      fillcolor: "rgba(0, 128, 0, 0.2)",
    },
    {
      x: predX,
      y: lowerBound,
      type: "scatter",
      mode: "lines",
      line: { color: "rgba(0, 0, 0, 0)" },
      fill: "tonexty",
      fillcolor: "rgba(128, 0, 0, 0.2)",
      name: "Lower Bound",
    },
  ];

  // Define layout for the Plotly chart
  const layout = {
    title: parameter,
    xaxis: {
      title: "Date",
      range: [
        new Date(Math.min(...parameterX)) - 24 * 60 * 60 * 1000,
        new Date(Math.max(...parameterX)) + 24 * 60 * 60 * 1000,
      ],
    },
    yaxis: { title: "Value" },
    width: 500,
    height: 300,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4,
    },
  };

  return (
    <div className={`${className}`}>
      <Plot data={data} layout={layout} />
    </div>
  );
};

export default PlotlyCharts;
