define(['app/qlikApp/qlikApp'], function() {

    var module = angular.module('search', ['qlikApp']);

	var search = function() {
		return {
			restrict: "E",
			template: "<div class='search-directive'><input class='search-directive-input form-control' type='text' placeholder='Search' ng-model='selected' uib-typeahead='result.label for result in getResults($viewValue)' typeahead-loading='loadingResults' typeahead-on-select='select($item)'><i class='glyphicon glyphicon-refresh' ng-show='loadingResults'></i></div>",
			scope: {
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
	}
	search.$inject = [];

	module.directive('search', search);

    return module;

});