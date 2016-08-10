define([], function() { 
	
	function routes($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state("examples", {
				url: "/",
				templateUrl: "app/examples/examples.html",
				controller: "examplesController"
			});
		$urlRouterProvider.otherwise("/");
	}
	routes.$inject=['$stateProvider', '$urlRouterProvider'];

	return routes;
});