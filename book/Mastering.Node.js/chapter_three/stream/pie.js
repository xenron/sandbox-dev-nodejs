//	Pie code from:
//	https://gist.github.com/mattbaker/1509145

function insertPie(selector, w, h, allocation) {
	var el = window.document.querySelector(selector);
    var radius = Math.min(w, h) / 2;
  	var gradients = [
  			["#1e5799", "#7db9e8"],
  			["#b847af", "#f369e8"],
  			["#2293bb", "#6ac9ea"],
  			["#ebab17", "#f4cf66"],
  			["#5d4ef9", "#8c81ff"],
  			["#dc570e", "#ff7e00"],
  			["#a57005", "#daa73e"],
  			["#e19e7d", "#ffc8ad"],
  			["#ef45a8", "#ff7bc7"],
  			["#b8124a", "#f7296c"],
  			["#065190", "#1a72bd"],
  			["#296c30", "#52a95b"]
  		];
  		var slices = d3.layout.pie()(allocation);
  		var arc = 	d3.svg.arc()
					.startAngle(function(d) { 
						return d.startAngle; 
					})
					.endAngle(function(d) { 
						return d.endAngle; 
					})
					.innerRadius(0)
					.outerRadius(radius);
  
	var vis = d3.select(el)
	  .append("svg:svg")
		  .attr("width", w)
		  .attr("height", h)
	    .append("svg:g")
		  .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
		  
	var defs = vis.append("svg:defs");
	
	//Define our color gradients
	for (var i=0,l=gradients.length;i<l;i++) {
		var gradientColors = gradients[i];
		var gradient = defs.append("svg:radialGradient")
			.attr("id", "grad-"+i)
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", radius);
		gradient.append("svg:stop")
			.attr("offset", 0)
			.attr("stop-color", gradientColors[1]);
		gradient.append("svg:stop")
			.attr("offset", .3)
			.attr("stop-color", gradientColors[1]);
		gradient.append("svg:stop")
			.attr("offset", 1)
			.attr("stop-color", gradientColors[0]);
	}

  //Build Pie
	vis.selectAll("path").data(slices)
	.enter()
	.append("svg:path")
	.attr("d", arc)
	.style("fill", function(d, i) { 
		return "url(#grad-"+i+")"; 
	});
	return el;
}