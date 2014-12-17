/**
 * Created by dpatro on 12/15/14.
 */

function drawCard(org) {

  d3.select("#card").select("svg").remove();

  var cardDiv = d3.select("#card");

  var width = parseInt(cardDiv.style("width")),
    height = width;

  var svg = cardDiv.append('svg')
    .attr('height', height)
    .attr('width', width);

  var g = svg.append('g').attr("transform", "scale(0)");
  var rect = g.append('rect')
    .attr('width', "100%")
    .attr('height', "100%")
    .style('fill', 'black')
    .style('fill-opacity', 0.1)
    .attr('stroke', 'black');

  var text = g.append('foreignObject')
    .attr('x', 50)
    .attr('y', 130)
    .attr('width', "100%")
    .attr('height', "100%")
    .append("xhtml:body")
    .html(
      '<div>' +
      '<p><h2>' + org.name + '</h2></p>' +
      '<p><a href="' + org.link + '" target="_blank"> Link to Ideas </a></p>' +
      '</div>', org
  );

  g.transition().duration(500).attr("transform", "scale(1)");
}