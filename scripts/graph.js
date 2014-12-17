/**
 * Created by dpatro on 12/14/14.
 */

function drawGraph(org) {

  var links = org.tags.map(function (tag) {
    return {source: org.name, target: tag};
  });

  var diameter = parseInt(d3.select("#graph").style("width"));

  // Graph
  var nodes = {};
  // Compute the distinct nodes from the links.
  links.forEach(function (link) {
    link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
  });

  // Remove old graph
  d3.select("#graph").select("svg").remove();

  var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([diameter, diameter])
//    .linkDistance(60)
    .charge(-1000)
    .on("tick", tick)
    .start();

  var graph = d3.select("#graph").append("svg")
    .attr("width", diameter)
    .attr("height", diameter);

  var link = graph.selectAll(".link")
    .data(force.links())
    .enter().append("line")
    .attr("class", "link");

  var node = graph.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
//    .on("mouseover", mouseover)
//    .on("mouseout", mouseout)
    .call(force.drag);

  node.append("circle")
    .attr("r", function(d) {return d.name.length*5;})
    .style("fill", function(d) {return d.index ? "yellow": "blue";})
    .style("fill-opacity", 0.5)
  ;

  node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function (d) {
      return d.name;
    });

  function tick() {
    link
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    node
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
  }

  function mouseover() {
    d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 16);
  }

  function mouseout() {
    d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 8);
  }
}