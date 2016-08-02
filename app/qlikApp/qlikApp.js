define([], function() {

    var module = angular.module('qlikApp', []);

	var qlikApp = function($q) {
		//opens Qlik Sense app with appId and config set in main.js
		var app = qlik.openApp(appId, config);
		this.app = app;

		/*
		* the following methods add functionality to app api methods to destroy session object on scope destroy 
		*/
		this.createCube = function(def, callback, scope) {
			var deferred = $q.defer();
			app.createCube(def, function(reply){callback(reply)}).then(function(model) {
				deferred.resolve(model);
				if(scope) {
					scope.$on('$destroy', function() {
						app.destroySessionObject(model.id);
					});
				}
			});
			return deferred.promise;
		}

		this.createGenericObject = function(def, callback, scope) {
			var deferred = $q.defer();
			app.createGenericObject(def, function(reply){callback(reply)}).then(function(model) {
				deferred.resolve(model);
				if(scope) {
					scope.$on('$destroy', function() {
						app.destroySessionObject(model.id);
					});
				}
			});
			return deferred.promise;
		}

		this.createList = function(def, callback, scope) {
			var deferred = $q.defer();
			app.createList(def, function(reply){callback(reply)}).then(function(model) {
				deferred.resolve(model);
				if(scope) {
					scope.$on('$destroy', function() {
						app.destroySessionObject(model.id);
					});
				}
			});
			return deferred.promise;
		}

		this.createTable = function(dimensions, measures, options, scope) {
			var deferred = $q.defer();
			app.createTable(dimensions, measures, options).then(function(model) {
				deferred.resolve(model);
				if(scope) {
					scope.$on('$destroy', function() {
						app.destroySessionObject(model.id);
					});
				}
			});
		}
	};
	qlikApp.$inject = ['$q'];

	module.service('qlikApp', qlikApp); 

	return module;
});