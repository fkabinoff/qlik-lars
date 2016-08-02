var requireApp = require.config({
	context: 'appRequire',
	baseUrl: './',
	map: {
		'*': {
			less: 'node_modules/requirejs-style-plugins/less'
		}
	}
});

requireApp(['app/templates', 'app/home/home'], function(templates) { 
	
	var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'home']);
	app.run(templates);

});