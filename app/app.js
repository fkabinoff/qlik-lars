require(['app/config.js', 'app/templates.js', 'app/services.js', 'app/directives.js', 'app/controllers.js'], function(config, templates, services, directives, controllers) { 
    
    var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);
    app.config(config);
    app.run(templates);
    
    app.service('qlikApp', services.qlikAppService);
    app.directive('senseObject', directives.senseObjectDirective);
    app.directive('search', directives.searchDirective);
    app.directive('dropdown', directives.dropdownDirective);
    app.controller('appController', controllers.appController);

});