/**
 * Created by dpatro on 12/14/14.
 */

function drawTree(org) {

  var root = {"name": org.name, children: org.tags.map(function(tag){return {name: tag};})};

  var diameter = parseInt(d3.select("#tree").style("width"));

  var cluster = d3.layout.cluster()
    .size([diameter, diameter*0.5]);

  var diagonal = d3.svg.diagonal()
    .projection(function (d) {
      return [d.y, d.x];
    });

  d3.select("#tree").select("svg").remove();

  var tree = d3.select("#tree").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate("+diameter/4+",0)");

  document.getElementById('orginfo').scrollIntoView();

  var nodes = cluster.nodes(root),
    links = cluster.links(nodes);

  var link = tree.selectAll(".link")
    .data(links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal)
    ;

  var node = tree.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    ;

  node.append("circle")
    .attr("r", 4.5);

  node.transition()
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    })
    ;

  node.append("text")
    .attr("dx", function (d) {
      return d.children ? -8 : 8;
    })
    .attr("dy", 3)
    .style("text-anchor", function (d) {
      return d.children ? "end" : "start";
    })
    .text(function (d) {
      return d.name;
    });

  d3.select(self.frameElement).style("height", diameter + "px");
}