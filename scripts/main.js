/**
 * Created by dpatro on 12/14/14.
 */

globalDict ={
  orgs: [],
  diameter: 960
};

function loadData(selector){
  if (selector.value.length){

    // Remove old drawings
    d3.select("#chart").select("svg").remove();
    d3.select("#tree").select("svg").remove();
    d3.select("#card").select("svg").remove();

    drawChart("data/"+selector.value, "#chart");
  }
}