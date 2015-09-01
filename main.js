var data = require('./data/nuts.json')
var d3 = require('d3')
var director = require('director')

var mapState = require('./lib/mapState')
var buttons = require('./lib/buttons')
var map = require('./lib/map')

//elements
var body = d3.select('body')
buttons(body)
map(body, data)

//routes
var routes = {
	'/:type/:value' : mapState	
}
var router = director.Router(routes);
router.init();
window.location.href = '#/colors/pop'






