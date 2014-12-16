/**
 * Created by dpatro on 12/14/14.
 */

function drawChart(srcJson, targetDiv) {

  function orgs(jArray) {
    jArray.sort(function (a, b) {
      return b.size - a.size
    });
    return jArray.map(function (d) {
      d.value = d.tags.length;
      return d;
    })
  }

  var diameter = 1024,
    format = d3.format(",d")
    ;

  var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter - 4, diameter - 4])
    .padding(2);


  d3.select(targetDiv).select("svg").remove();

  var chart = d3.select(targetDiv).append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble")
    ;

  chart.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "grey")
    .style("fill-opacity", 0.1)
  ;

  d3.json(srcJson, function (error, jsonArray) {
    globalDict.orgs = jsonArray.slice(0);

    var node = chart.selectAll(".node")
      .data(bubble.nodes({children: orgs(jsonArray)})
        .filter(function (d) {
          return !d.children;
        }))
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("title")
      .text(function (d) {
        return d.name + ": " + format(d.value);
      });

    node.append("circle")
      .attr("r", function (d) {
        return d.r;
      })
      .style("fill", function (d) {
        return "rgb(" + d.value * 200 + "," + 0 + "," + 0 + ")";
      })
      .style("fill-opacity", 0.5)
      .on("click", function (d) {
        drawGraph(d);
        drawCard(d);
      })
    ;

    node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.name;
      });
  });


  d3.select(self.frameElement).style("height", diameter + "px");
}