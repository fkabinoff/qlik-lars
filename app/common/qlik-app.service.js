define([], function() {

  function QlikAppService($q) {
    //opens Qlik Sense app with appId and config set in main.js
    this.app = qlik.openApp(appId, config);

    /*
    * the following methods add functionality to app api methods to destroy session object on scope destroy 
    */
    this.createCube = function(def, callback, scope) {
      var deferred = $q.defer();
      this.app.createCube(def, function(reply){callback(reply)}).then(function(model) {
        deferred.resolve(model);
        if(scope) {
          scope.$on('$destroy', function() {
            this.app.destroySessionObject(model.id);
          });
        }
      });
      return deferred.promise;
    }

    this.createGenericObject = function(def, callback, scope) {
      var deferred = $q.defer();
      this.app.createGenericObject(def, function(reply){callback(reply)}).then(function(model) {
        deferred.resolve(model);
        if(scope) {
          scope.$on('$destroy', function() {
            this.app.destroySessionObject(model.id);
          });
        }
      });
      return deferred.promise;
    }

    this.createList = function(def, callback, scope) {
      var deferred = $q.defer();
      this.app.createList(def, function(reply){callback(reply)}).then(function(model) {
        deferred.resolve(model);
        if(scope) {
          scope.$on('$destroy', function() {
            this.app.destroySessionObject(model.id);
          });
        }
      });
      return deferred.promise;
    }

    this.createTable = function(dimensions, measures, options, scope) {
      var deferred = $q.defer();
      this.app.createTable(dimensions, measures, options).then(function(model) {
        deferred.resolve(model);
        if(scope) {
          scope.$on('$destroy', function() {
            this.app.destroySessionObject(model.id);
          });
        }
      });
    }
  };
  QlikAppService.$inject = ['$q']; 

  return QlikAppService;
});