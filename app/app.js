var requireApp = require.config({
	context: 'appRequire',
	baseUrl: './',
	map: {
		'*': {
			less: 'node_modules/requirejs-style-plugins/less'
		}
	}
});

requireApp(['app/templates', 'app/examples/examples'], function(templates) { 
	
	var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'examples']);
	app.run(templates);

});