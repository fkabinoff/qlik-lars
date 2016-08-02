define(['app/home/home.routes', 'app/home/home.controller', 'app/qlikApp/qlikApp', 'app/dropdown/dropdown', 'app/search/search', 'app/senseObject/senseObject'], function(homeRoutes, homeController) {

	var module = angular.module('home', ['qlikApp', 'dropdown', 'search', 'senseObject']);
	module.config(homeRoutes);
	module.controller('homeController', homeController);

	return module;
});