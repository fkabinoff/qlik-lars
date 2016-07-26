define([], function() { 
    
    var services = {};

    services.qlikAppService = function() {
        //opens Qlik Sense app with appId and config set in main.js
		this.app = qlik.openApp(appId, config);
	};
    services.qlikAppService.$inject = [];

    return services;
});
