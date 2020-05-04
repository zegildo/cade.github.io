 function insert_point(svg, x_value, y_value, raio, color){

    var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);
    
    var point = svg.append("circle")
                     .attr("fill", color)
                     .attr("stroke", "none")
                     .attr("cx", x(x_value))
                     .attr("cy", y(y_value))
                     .attr("r", raio)
                     .on("mouseover", function(d) {
                        div.transition()    
                        .duration(200)
                        .style("opacity", .9);    
                    div.html("("+x_value+","+y_value+")")  
                      .style("left", (d3.event.pageX) + "px")   
                      .style("top", (d3.event.pageY - 28) + "px");  
                    })          
                    .on("mouseout", function(d) {   
                        div.transition()    
                            .duration(500)    
                            .style("opacity", 0); 
                    });;
    }

    function insert_constant_line(svg, x1, y1, x2, y2, color){
      var line = svg.append( "line" )
                    .attr("x1", x(x1))
                    .attr("x2", x(x2))
                    .attr("y1", y(y1))
                    .attr("y2", y(y2))
                    .attr("stroke-width",2)
                    .attr("stroke-dasharray",5)
                    .attr("stroke", color);
    }

    function color_area(svg, x1, y1, width, height, color){
      var color_box = svg.append("rect")
                         .attr("x", x1)
                         .attr("y", y1)
                         .attr("width", width)
                         .attr("height", height)
                         .attr("fill", color)
                         .attr("opacity", 0.2);
    }

    function label_x(svg, width, height, label){
      var label_x = svg.append("text")
                       .attr("font-weight", "bold")          
                       .attr("transform",
                              "translate(" + (width) + " ," + 
                                             (height + margin.bottom) + ")")
                       .style("text-anchor", "middle")
                       .text(label);
    }

    function label_y(svg, height, label){

      var label_y = svg.append("text")
                       .attr("transform", "rotate(-90)")
                       .attr("y", 0 - margin.left)
                       .attr("x",0 - (height / 2))
                       .attr("dy", "1.2em")
                       .attr("font-weight", "bold")
                       .style("text-anchor", "middle")
                       .text(label);
    }
    //set the dimensions and margins of the graph
    var margin = {top: 20, right: 25, bottom: 30, left: 60},
        width = 850 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleLinear()
              .domain([0,1000])
              .range([0, width]);
    var y = d3.scaleLinear()
              .domain([0,10000])
              .range([height,0]);


    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#plano").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style('fill', 'black');

 
    insert_constant_line(svg, x1=0, y1=1500, x2=1000, y2=1500, color="green");
    insert_constant_line(svg, x1=100, y1=0, x2=100, y2=10000, color="green");
    insert_constant_line(svg, x1=200, y1=0, x2=200, y2=10000, color="red");
    insert_constant_line(svg, x1=0, y1=2500, x2=1000, y2=2500, color="red");

// add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
    .call(d3.axisLeft(y));
  

  red_widht = x(1000) - x(200);  
  color_area(svg, x1=x(200), y1=y(10000), width=red_widht, height=y(2500), color="red");

  widht_green = x(1000) - x(100);
  height_green = y(margin.bottom) - y(1500);
  color_area(svg, x1=x(100), y1=y(1500), width=widht_green, height=height_green, color="green");
  color_area(svg, x1=x(0), y1=y(10000), width=x(100), height=y(0), color="green");
  color_area(svg, x1=x(100), y1=y(10000), width=x(100), height=y(1500), color="yellow");

  widht_yellow = x(x.domain()[x.domain().length - 1]) - x(200);
  height_yellow = y(margin.bottom) - y(1000)
  color_area(svg, x1=x(200), y1=y(2500), width=widht_yellow, height=height_yellow, color="yellow");

  label_y(svg, length=y(0), label="HHI");
  label_x(svg, width=x(500), length=y(0), label="Δ HHI");
  