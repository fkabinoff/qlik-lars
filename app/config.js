define([], function() { 
    
	function config($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/views/app.html',
			controller: 'appController'					
		})
		.otherwise({
			templateUrl: 'app/views/app.html',
			controller: 'appController'
		})
	}
    config.$inject=['$routeProvider', '$locationProvider'];

  	return config;
});