define(['app/examples/examples.routes', 'app/examples/examples.controller', 'app/qlikApp/qlikApp', 'app/dropdown/dropdown', 'app/search/search', 'app/senseObject/senseObject'], function(examplesRoutes, examplesController) {

	var module = angular.module('examples', ['qlikApp', 'dropdown', 'search', 'senseObject']);
	module.config(examplesRoutes);
	module.controller('examplesController', examplesController);

	return module;
});