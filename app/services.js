define([], function() { 
    
    var services = {};

    services.qlikAppService = function($rootScope) {
        //opens Qlik Sense app with appId and config set in main.js
		var app = qlik.openApp(appId, config);
		this.app = app;

        // arrays of current session objects and sense objects
        var sessionObjects = [];
        var senseObjects = [];

        //public methods to add session objects and sense objects
        this.addSessionObject = function(object) {
            sessionObjects.push(object);
        }
        this.addSenseObject = function(object) {
            senseObjects.push(object);
        }

        //removes session objects and sense objects on route change
        $rootScope.$on('$routeChangeSuccess', function(next, current) {
            //destroy session objects
            angular.forEach(sessionObjects, function(object) {
                app.destroySessionObject(object.id);
            });
            sessionObjects = [];
            
            //close sense objects
            angular.forEach(senseObjects, function(object, key) {
                object.close();
            });
            senseObjects = [];
        });
	};
    services.qlikAppService.$inject = ['$rootScope'];

    return services;
});
