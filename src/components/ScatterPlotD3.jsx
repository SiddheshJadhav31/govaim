import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ScatterPlotD3 = ({ data, xColumn, yColumn }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("viewBox", `0 0 600 400`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("max-width", "100%")
      .style("max-height", "100%")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d[xColumn])]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d[yColumn])]).range([height, 0]);

    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));
    g.append("g").call(d3.axisLeft(yScale));

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[xColumn]))
      .attr("cy", (d) => yScale(d[yColumn]))
      .attr("r", 5)
      .attr("fill", "#ff5722");

  }, [data, xColumn, yColumn]);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlotD3;
