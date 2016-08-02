define(['app/home/home.routes.js', 'app/home/home.controller.js', 'app/qlikApp/qlikApp.js', 'app/dropdown/dropdown.js', 'app/search/search.js', 'app/senseObject/senseObject.js'], function(homeRoutes, homeController) {

	var module = angular.module('home', ['qlikApp', 'dropdown', 'search', 'senseObject']);
	module.config(homeRoutes);
	module.controller('homeController', homeController);

	return module;
});