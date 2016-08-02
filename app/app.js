// var requireApp = require.config({
// 	context: 'appRequire',
// 	baseUrl: './'
// });

define(['app/templates', 'app/examples/examples'], function(templates) { 
	
	var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'examples']);
	app.run(templates);

});