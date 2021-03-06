/**
 * Created by dpatro on 12/14/14.
 */

function drawChart(srcJson) {

  var chartDiv = d3.select("#chart");

  function orgs(jArray) {
    jArray.sort(function (a, b) {
      return b.size - a.size
    });
    return jArray.map(function (d) {
      d.value = d.tags.length;
      return d;
    })
  }

  var height = parseInt(chartDiv.style("height")),
    width = parseInt(chartDiv.style("width")),
    format = d3.format(",d")
    ;

  var pack = d3.layout.pack()
    .sort(function (a, b) {
      return b.value - a.value;
    })
    .size([width, height-100])
    .padding(2);

  d3.json(srcJson, function (error, jsonArray) {
    globalDict.orgs = jsonArray.slice(0);

    chartDiv.select("p").remove();
    chartDiv.append("p")
      .html("Total # of Organizations: " + globalDict.orgs.length + ".<br/><b>Hover</b> on bubble for more info. <b>Click</b> for detailed view.")
    ;

    var chart = chartDiv.append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "bubble")
      ;

    document.getElementById('chart').scrollIntoView();

    chart.append("rect")
      .attr("width", width)
      .attr("height", height - 100)
      .style("fill", "#FFF8D0")
      .style("fill-opacity", 0.1)
      .style("stroke", "black")
    ;
    var node = chart.selectAll(".node")
      .data(pack.nodes({children: orgs(jsonArray)})
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
        document.getElementById("card").focus();
        drawTree(d);
        drawCard(d);
      })
      .on("mouseover", function (d) {
        d3.select(this).transition()
          .duration(750)
          .attr("r", d.r + 20);
      })
      .on("mouseout", function (d) {
        d3.select(this).transition()
          .duration(750)
          .attr("r", d.r);
      })
    ;
  });

  d3.select(self.frameElement).style("height", height + "px");
}