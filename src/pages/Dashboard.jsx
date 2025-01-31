import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

const Dashboard = () => {
  const [visualizations, setVisualizations] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/response.json")
      .then((res) => res.json())
      .then((json) => {
        console.log("Visualizations Loaded:", json.visualizations);
        setVisualizations(json.visualizations);
      });
  }, []);

  useEffect(() => {
    Papa.parse("/titanic.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => setData(result.data),
    });
  }, []);

  const renderVisualization = (viz) => {
    switch (viz.type) {
      case "Bar Chart":
        return <BarVisualization data={data} xColumn={viz.x_column} yColumn={viz.y_column} />;
      case "Pie Chart":
        return <PieVisualization data={data} xColumn={viz.x_column} />;
      case "Scatter Plot":
        return <ScatterVisualization data={data} xColumn={viz.x_column} yColumn={viz.y_column} />;
      case "Histogram":
        return <HistogramVisualization data={data} xColumn={viz.x_column} />;
      case "Box Plot":
        return <BoxPlotVisualization data={data} xColumn={viz.x_column} yColumn={viz.y_column} />;
      default:
        return <p>Unsupported visualization type: {viz.type}</p>;
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visualizing data dynamically</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visualizations.map((viz, index) => (
          <div key={index} className="card p-4 shadow-lg rounded-lg bg-white">
            <h2 className="text-lg font-semibold mb-4">{viz.type}</h2>
            {renderVisualization(viz)}
          </div>
        ))}
      </div>
    </div>
  );
};


const BarVisualization = ({ data, xColumn, yColumn }) => (
  <div style={{ height: 300 }}>
    <ResponsiveBar
      data={data}
      keys={[yColumn]}
      indexBy={xColumn}
      margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
      padding={0.4} 
      colors={{ scheme: "nivo" }}
      axisBottom={{ tickRotation: -45 }}
    />
  </div>
);


const PieVisualization = ({ data, xColumn }) => {
  const pieData = data.reduce((acc, row) => {
    const existing = acc.find((item) => item.id === row[xColumn]);
    if (existing) existing.value += 1;
    else acc.push({ id: row[xColumn], value: 1 });
    return acc;
  }, []);

  return (
    <div style={{ height: 300 }}>
      <ResponsivePie
        data={pieData}
        margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
        colors={{ scheme: "nivo" }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
      />
    </div>
  );
};


const ScatterVisualization = ({ data, xColumn, yColumn }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <div style={{ height: 300 }}>
      <ResponsiveScatterPlot
        data={[
          {
            id: "Data",
            data: data.map((row) => ({
              x: row[xColumn],
              y: row[yColumn],
            })),
          },
        ]}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: "linear" }}
        yScale={{ type: "linear" }}
        colors={{ scheme: "category10" }}
      />
    </div>
  );
};


const HistogramVisualization = ({ data, xColumn }) => {
  const histogramData = data.reduce((acc, row) => {
    acc[row[xColumn]] = (acc[row[xColumn]] || 0) + 1;
    return acc;
  }, {});

  const formattedData = Object.entries(histogramData).map(([key, value]) => ({
    id: key,
    value,
  }));

  return (
    <div style={{ height: 300 }}>
      <ResponsiveBar
        data={formattedData}
        keys={["value"]}
        indexBy="id"
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        padding={0.6}
        colors={{ scheme: "nivo" }}
      />
    </div>
  );
};

const BoxPlotVisualization = ({ data, xColumn, yColumn }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const groupedData = data.reduce((acc, row) => {
    if (row[xColumn] && typeof row[yColumn] === "number") {
      if (!acc[row[xColumn]]) acc[row[xColumn]] = [];
      acc[row[xColumn]].push(row[yColumn]);
    }
    return acc;
  }, {});

  const boxPlotData = Object.keys(groupedData).map((key) => {
    const values = groupedData[key].sort((a, b) => a - b);
    const q1 = values[Math.floor(values.length * 0.25)];
    const median = values[Math.floor(values.length * 0.5)];
    const q3 = values[Math.floor(values.length * 0.75)];
    return {
      id: key,
      min: values[0],
      q1,
      median,
      q3,
      max: values[values.length - 1],
    };
  });

  return (
    <div style={{ height: 300 }}>
      <ResponsiveBar
        data={boxPlotData}
        keys={["min", "q1", "median", "q3", "max"]}
        indexBy="id"
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        padding={0.5}
        colors={{ scheme: "nivo" }}
      />
    </div>
  );
};

export default Dashboard;
