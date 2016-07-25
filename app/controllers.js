define([], function() {

    var controllers = {};

    controllers.appController = function($scope, qlikApp) {

        // gets qlik sense object and adds to #chart1
        qlikApp.app.getObject("chart1", "a5e0f12c-38f5-4da9-8f3f-0e4566b28398").then(function(model) {
            qlikApp.addSenseObject(model); // add sense object to objects to be closed on route change
        });

	};
    controllers.appController.$inject = ['$scope', 'qlikApp'];

    return controllers;
});