define([], function() { 
	
	function routes($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/home/home.html',
			controller: 'homeController'					
		})
	}
	routes.$inject=['$routeProvider', '$locationProvider'];

	return routes;
});