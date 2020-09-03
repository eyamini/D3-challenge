// @TODO: YOUR CODE HERE!
//function makeResponsive() {
    var svgWidth = 960;
    var svgHeight = 500;
    var margin = {
        top: 20,
        right: 40,
        bottom: 60,
        left:50
    };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // SVG Attributes
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    //Retrieve data from CSV
    d3.csv("assets/data/data.csv")
        .then(function(demographics){
        demographics.forEach(function(data) {
            data.age = +data.age;
            data.smokes = +data.smokes;
            data.healthcare = +data.healthcare;
            data.poverty = +data.poverty;
            data.abbr = data.abbr;
            data.income = +data.income;
        });
    //x and y scales
        const xLinearScale = d3.scaleLinear()
            .domain([8.5, d3.max(demographics, d => d.poverty)])
            .range([0, width]);
        const yLinearScale = d3.scaleLinear()
            .domain([3.5, d3.max(demographics, d => d.healthcare)])
            .range([height, 0]);
    
    //define x y axis
        const xAxis = d3.axisBottom(xLinearScale);
        const yAxis = d3.axisLeft(yLinearScale);
    
        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
    
        chartGroup.append("g")
        .call(yAxis);
        
    //Define circles
        chartGroup.selectAll("circle")
            .data(demographics)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", 10)
            .attr("fill", "blue")
            .attr("opacity", ".6")
            .attr("stroke-width", "1")
            .attr("stroke", "black");
    
            chartGroup.select("g")
            .selectAll("circle")
            .data(demographics)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .attr("dy",-395)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black");
         
            console.log(demographics);
    
        chartGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - 50)
          .attr("x", 0 -250)
          .attr("dy", "1em")
          .attr("class", "axisText")
          .text("Lacks Healthcare (%)");
    
        chartGroup.append("text")
          .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
          .attr("class", "axisText")
          .text("In Poverty (%)");
    
    });
    //} 
    //makeResponsive();