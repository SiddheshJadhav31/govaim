import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const HistogramD3 = ({ data, xColumn }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 600, height = 400, margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const svg = d3.select(svgRef.current);

    // Clear previous chart
    svg.selectAll("*").remove();

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("max-width", "100%")
      .style("max-height", "100%")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d[xColumn]))
      .nice()
      .range([0, width - margin.left - margin.right]);

    const histogram = d3.histogram()
      .domain(xScale.domain())
      .thresholds(xScale.ticks(20))
      .value(d => d[xColumn]);

    const bins = histogram(data);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    // Draw bars
    g.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
      .attr("height", d => height - margin.top - margin.bottom - yScale(d.length))
      .attr("fill", "#69b3a2");

    // Add X Axis
    g.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Add Y Axis
    g.append("g").call(d3.axisLeft(yScale));

  }, [data, xColumn]);

  return <svg ref={svgRef}></svg>;
};

export default HistogramD3;
