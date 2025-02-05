import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChartD3 = ({ data, xColumn }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 300, height = 300, radius = Math.min(width, height) / 2;
    const svg = d3.select(svgRef.current);

    // Clear previous chart
    svg.selectAll("*").remove();

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("max-width", "100%")
      .style("max-height", "100%")
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Process Data
    const countData = d3.rollup(data, v => v.length, d => d[xColumn]);
    const pieData = Array.from(countData, ([key, value]) => ({ key, value }));

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Draw arcs
    g.selectAll("path")
      .data(pie(pieData))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i)) // Ensure correct color indexing
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.9);

  }, [data, xColumn]);

  return <svg ref={svgRef}></svg>;
};

export default PieChartD3;
