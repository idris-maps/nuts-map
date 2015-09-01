var d3 = require('d3')
var data = require('../data/nuts.json')
var colors = ['#66bd63', '#a6d96a', '#d9ef8b', '#ffffbf', '#fee08b', '#fdae61', '#f46d43']

module.exports = function(type, value) {
	console.log(type,value)
	var regions = d3.selectAll('path.regions')
	
	if(type === 'colors') {
		d3.select('#points').attr('opacity', 0)
		var thisData = []
		for(i=0;i<data.features.length;i++) {
			var prop = data.features[i].properties
			if(prop[value] !== undefined && prop[value] !== null) {
				thisData.push(prop[value])
			}
		}
		var scale = d3.scale.quantile()
			.range(colors)
			.domain(thisData)
		regions
			.attr('fill', function(d) { 
				if(d.properties[value] !== undefined && d.properties[value] !== null) {
					return scale(d.properties[value]) 
				} else {
					return 'none'
				}
			})
	}
	if(type === 'bubbles') {
		d3.select('#points').attr('opacity', 0.3)
		regions.attr('fill', 'lightgray')
		var thisData = []
		for(i=0;i<data.features.length;i++) {
			var f = data.features[i]
			if(f.properties[value] !== undefined && f.properties[value] !== null) {
				thisData.push(f.properties[value])
			}
		}
		var scale = d3.scale.linear()
			.range([1,20])
			.domain([
				d3.min(thisData, function(d) { return d }),
				d3.max(thisData, function(d) { return d })
			])
		for(i=0;i<data.features.length;i++) {
			var f = data.features[i]
			var id = 'pt' + f.properties.id
			if(f.properties[value] !== undefined && f.properties[value] !== null) {
				d3.select('circle#' + id).attr('r', scale(f.properties[value]))
			} else {
				d3.select('circle#' + id).attr('r', 0)
			}
		}
	}
}
