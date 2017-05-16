define(['app/examples/examples.routes', 'app/examples/examples.controller'], function(examplesRoutes, examplesController) {

	var module = angular.module('examples', []);
	module.config(examplesRoutes);
	module.controller('examplesController', examplesController);

	return module;
});