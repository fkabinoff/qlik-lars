require({context: 'requireApp'}, ['app/templates', 'app/examples/examples'], function(templates) { 
	var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'examples']);
	app.run(templates);
	angular.bootstrap(document, ["app", "qlik-angular"]);
});