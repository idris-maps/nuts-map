var valuesData = [
		{id: 'pop', name: 'Population'},
		{id: 'area', name: 'Surface'}, 
		{id: 'density', name: 'Density'},
		{id: 'gdp', name: 'GDP'},
		{id: 'gdp_ph', name: 'GDP by inhab.'},
		{id: 'life_ex', name: 'Life expectancy'},
		{id: 'unempl', name: 'Unemployment'},
		{id: 'edu_3', name: 'Higher education'},
	]

module.exports = function(body) {
	var buttons = body.append('div').attr('id', 'buttons')
	type(buttons)
	values(buttons, valuesData)
}

function values(buttons, data) {
	var dropdown = buttons.append('select')
		.attr({
			id: 'values'
		})
	for(i=0;i<data.length;i++) {
		dropdown.append('option')
			.attr({
				id: data[i].id,
				class: 'valueOption'
			})
			.text(data[i].name)
	}
	dropdown.selectAll('.valueOption').on('click', function() {
		var type = getType(window.location.href)
		var value = d3.event.target.id
		window.location.href = '#/' + type + '/' + value
	})
}



function type(buttons) {
	var radio = buttons.append('form')

	radio.append('input')
		.attr({
			id: 'colors',
			value: 'colors',
			name: 'type',
			type: 'radio' ,
			checked: ''
		})
	radio.append('text').text('Colors')

	radio.append('input')
		.attr({
			id: 'bubbles',
			value: 'bubbles',
			name: 'type',
			type: 'radio'
		})
		.text('Bubbles')
	radio.append('text').text('Bubbles')

	radio.on('click', function() {
		var type = d3.event.target.value
		var value = getValue(window.location.href)
		window.location.href = '#/' + type + '/' + value
	})
}

function getValue(href) {
	var hash = href.split('#')[1]
	var value = hash.split('/')[2]
	return value
}

function getType(href) {
	var hash = href.split('#')[1]
	var type = hash.split('/')[1]
	return type
}
