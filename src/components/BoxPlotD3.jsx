import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BoxPlotD3 = ({ data, xColumn, yColumn }) => {
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

    const xScale = d3.scaleBand().domain([xColumn]).range([0, width]).padding(0.2);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d[yColumn])]).range([height, 0]);

    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));
    g.append("g").call(d3.axisLeft(yScale));

    g.selectAll("line")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", (d) => xScale(xColumn) + xScale.bandwidth() / 2)
      .attr("x2", (d) => xScale(xColumn) + xScale.bandwidth() / 2)
      .attr("y1", (d) => yScale(d[yColumn]))
      .attr("y2", height)
      .attr("stroke", "black");

  }, [data, xColumn, yColumn]);

  return <svg ref={svgRef}></svg>;
};

export default BoxPlotD3;
