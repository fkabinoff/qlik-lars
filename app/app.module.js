require({context: 'requireApp'}, ['app/app.component', 'app/common/app.common.module', 'app/examples/examples'], function(AppComponent) { 
	
	angular
		.module('app', ['ui.router', 'ui.bootstrap', 'app.common', 'examples'])
		.component('app', AppComponent);

	angular.bootstrap(document, ["app", "qlik-angular"]);
});