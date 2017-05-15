require({context: 'requireApp'}, ['app/app.component', 'app/examples/examples'], function(app) { 
	angular
		.module('app', ['ui.router', 'ui.bootstrap', 'examples'])
		.directive('app', app);

	angular.bootstrap(document, ["app", "qlik-angular"]);
});