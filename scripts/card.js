/**
 * Created by dpatro on 12/15/14.
 */

function drawCard(org) {

  console.log(org);

  d3.select("#card").select("svg").remove();

  svg = d3.select("#card").append('svg')
    .attr('height', 500)
    .attr('width', 1000);
  var g = svg.append('g').attr("transform", "scale(0)");
  rect = g.append('rect')
    .attr('width', "100%")
    .attr('height', "100%")
    .attr('x', 40)
    .attr('y', 100)
    .style('fill', 'black')
    .style('fill-opacity', 0.1)
    .attr('stroke', 'black');
  text = g.append('foreignObject')
    .attr('x', 50)
    .attr('y', 130)
    .attr('width', "100%")
    .attr('height', "100%")
    .append("xhtml:body")
    .html(
      '<div>' +
      '<p><h2>' + org.name + '</h2></p>' +
      '<p>'+ org.tags.join("  ,") +'</p>'+
      '<p><a href="'+org.link+'" target="_blank">'+org.link+'</a></p>' +
      '</div>', org
    );

  g.transition().duration(500).attr("transform", "scale(1)");
}