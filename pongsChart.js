/*********************************************************************************
* File Name     : pongsChart.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-23 18:25]
* Last Modified : [2018-11-23 22:24]
* Description   :  
**********************************************************************************/
const D3Node = require('d3-node');

function line({
  data,
  selector: _selector = '#chart',
  container: _container = `
    <div id="container">
      <div id="chart"></div>
    </div>
  `,
  style: _style = '',
  width: _width = 320,
  height: _height = 180,
  margin: _margin = { top: 20, right: 20, bottom: 60, left: 30 },
  lineWidth: _lineWidth = 1.5,
  color: color = 'steelblue',
  isCurve: _isCurve = true,
  tickSize: _tickSize = 5,
  tickPadding: _tickPadding = 5,
} = {}) {
  const d3n = new D3Node({
    selector: _selector,
    svgStyles: _style,
    container: _container,
  });

  const d3 = d3n.d3;

  const width = _width - _margin.left - _margin.right;
  const height = _height - _margin.top - _margin.bottom;

  const svg = d3n.createSVG(_width, _height)
        .append('g')
        .attr('transform', `translate(${_margin.left}, ${_margin.top})`);

  const g = svg.append('g');

  const xScale = d3.scaleLinear()
      .rangeRound([0, width]);

  const yScale = d3.scaleLinear()
      .rangeRound([height, 0]);

  const xAxis = d3.axisBottom(xScale)
        .tickSize(_tickSize)
        .tickPadding(_tickPadding)
        .tickValues([0,6,12,18,23])
        .tickFormat((i) => data[i].label);

  const bmax = d3.max(data.map((d) => d.value));
  const yAxis = d3.axisLeft(yScale)
        .tickSize(_tickSize)
        .tickValues([d3.min(data.map(d => d.value)), bmax / 2,d3.max(data.map((d) => d.value))])
        .tickPadding(_tickPadding);

  const valueLine = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.value));

  xScale.domain([0, data.length]);
  yScale.domain([0, d3.max(data.map((d) => d.value))]);

  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  g.append('g').call(yAxis);

  g.append("g")
    .attr("fill", color)
    .selectAll("rect").data(data).enter().append("rect")
    .attr("x", (d,i) => i * (width / data.length))
    .attr("y", d => yScale(d.value))
    .attr("height", d => yScale(0) - yScale(d.value))
    .attr('width', '11');

  return d3n;
}

function hourlyBar(opt = {}) {
  return line(opt).svgString();
}

module.exports.hourlyBar = hourlyBar;
