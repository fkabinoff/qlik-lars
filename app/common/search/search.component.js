define(['text!app/common/search/search.component.html'], function(template) {
  return {
    template: template,
    bindings: {
      "fields": "="
    },
    controller: ['$scope', '$attrs', '$timeout', '$q', 'qlikApp', function($scope, $attrs, $timeout, $q, qlikApp) {
      $scope.context = $attrs.context ? $attrs.context : 'LockedFieldsOnly';  //Default to 'LockedFieldsOnly' if 'context' attribute not set
      // get results of search, called from async typeahead
      $scope.getResults = function(searchString) {
        $timeout.cancel(debounce); //need to debounce, or causes infinite loop with Qlik Engine
        var deferred = $q.defer();
        var debounce = $timeout(function() { 
          qlikApp.app.searchResults(  
            [searchString],  //search string
            {qOffset: 0, qCount: 100}, //how many results to return, and offset  
            {qSearchFields: $scope.fields, qContext: $scope.context}, //options object  
          function(reply) {
            var result = [];
            angular.forEach(reply.qResult.qSearchGroupArray, function(searchGroup) {
              angular.forEach(searchGroup.qItems[0].qItemMatches, function(match) {
                result.push({field: searchGroup.qItems[0].qIdentifier, label: match.qText});
              });
            });
            deferred.resolve(result);
          });
        }, 1000);
        return deferred.promise;  
      }
      // handles selections
      $scope.select = function(item) {
        qlikApp.app.field(item.field).toggleSelect(item.label, true);
        $scope.selected = "";
      }
    }]
  }
});