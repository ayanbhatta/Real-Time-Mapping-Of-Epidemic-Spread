// data.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Data({ covidData, tbData, malariaData }) {
  const covidRef = useRef();
  const tbRef = useRef();
  const malariaRef = useRef();

  useEffect(() => {
    const createBarChart = (data, element, color) => {
      d3.select(element).selectAll('*').remove();

      const width = 300;
      const height = 200;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      const svg = d3
        .select(element)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(data.map((d) => d.label));

      const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, (d) => d.value)]);

      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.label))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => height - y(d.value))
        .attr('fill', color);

      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g').call(d3.axisLeft(y));
    };

    const covidChartData = covidData.map((item) => ({
      label: item.country || 'Unknown',
      value: item.cases,
    }));

    const tbChartData = tbData.map((item) => ({
      label: item.SpatialDim || 'Unknown',
      value: item.NumericValue,
    }));

    const malariaChartData = malariaData.map((item) => ({
      label: item.SpatialDim || 'Unknown',
      value: item.NumericValue,
    }));

    createBarChart(covidChartData, covidRef.current, 'red');
    createBarChart(tbChartData, tbRef.current, 'blue');
    createBarChart(malariaChartData, malariaRef.current, 'green');
  }, [covidData, tbData, malariaData]);

  return (
    <div>
      <h3>Data Visualizations</h3>
      <div>
        <h4>COVID-19 Cases</h4>
        <div ref={covidRef}></div>
      </div>
      <div>
        <h4>Tuberculosis Cases</h4>
        <div ref={tbRef}></div>
      </div>
      <div>
        <h4>Malaria Cases</h4>
        <div ref={malariaRef}></div>
      </div>
    </div>
  );
}

export default Data;
