module.exports = function(body, data) {
	var width = window.innerWidth - 20
	var height = window.innerHeight - body.select('#buttons').node().getBoundingClientRect().height - 20
	
	var svg = body.append('svg').attr({width: width, height: height})
	
	var projection = d3.geo.mercator()
		  .scale(1)
		  .translate([0, 0]);
	var path = d3.geo.path()
		  .projection(projection);
	var b = path.bounds(data);
	var s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
	var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
	projection
		  .scale(s)
		  .translate(t)

	var nuts = svg.selectAll('path')
		.data(data.features)
		.enter()
		.append('path')
		.attr('id', function(d) { return d.properties.id })
		.attr('class', 'regions')
		.attr('d', path)
	
	var points = svg.append('g').attr('id','points')
	
	for(i=0;i<data.features.length;i++) {
		var f = data.features[i]
		points.append('circle')
			.attr({
				id: 'pt' + f.properties.id,
				cx: projection(f.properties.coords)[0],
				cy: projection(f.properties.coords)[1],
				r: 0
			})
	}
	
}
