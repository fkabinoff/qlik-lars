define([], function() { 
	
	function routes($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/examples/examples.html',
			controller: 'examplesController'					
		})
	}
	routes.$inject=['$routeProvider', '$locationProvider'];

	return routes;
});