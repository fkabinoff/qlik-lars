define(['app/qlikApp/qlikApp.js'], function() {

    var module = angular.module('dropdown', ['qlikApp']);

	var dropdown = function() {
		return {
			restrict: "E",
			templateUrl: "app/dropdown/dropdown.html",
			scope:{
				field: "@",
				toggle: "="
			},
			controller: ['$scope', '$attrs','qlikApp', function($scope, $attrs, qlikApp) {
				
				$scope.styles = {width: $attrs.width ? $attrs.width + "px" : "200px"}; // Default to 200px width for dropdown if 'width' attribute not set

				// creates list object
				qlikApp.app.createList({
					"qDef": {
						"qFieldDefs": ["[" + $scope.field + "]"],
						qSortCriterias: [{
							qSortByAscii: 1,
							qSortByNumeric: -1
						}]
					},
					"qAutoSortByState": {
						qDisplayNumberOfRows: 1
					},
					"qInitialDataFetch": [{
						qTop : 0,
						qLeft : 0,
						qHeight : 1000,
						qWidth : 1
					}]
				}, function(reply) {
					$scope.rows = _.flatten(reply.qListObject.qDataPages[0].qMatrix).filter(function(row) { return row.qText !== "Toronto Blue Jays"; });
				}).then(function(model) {
					$scope.model = model;
				});

				//destroys list object on scope change
				$scope.$on('$destroy', function() {
					qlikApp.app.destroySessionObject($scope.model.id);
				});

				// handles selections, if 'toggle' attribute set to true, then toggles selections
				$scope.selectRow=function(row){
					if ($scope.toggle == true) {
						qlikApp.app.field($scope.field).select([row.qElemNumber], true);
					} else {
						qlikApp.app.field($scope.field).select([row.qElemNumber], false);
					}
					$("ul").scrollTop(0);
				}

				// updates value of button
				$scope.$watchCollection('rows', function(rows) {
					var defaultValue = $attrs.name ? $attrs.name : $attrs.field;
					if(rows == undefined) { 
						$scope.selectedValue = defaultValue;
						return; 
					}
					$scope.selectedRows = rows.filter(function(row) { return row.qState === "S" });
					if ($scope.selectedRows.length === 1) {
						$scope.selectedValue = $scope.selectedRows[0].qText;
					} else if ($scope.selectedRows.length > 1) {
						$scope.selectedValue = defaultValue + ": " + $scope.selectedRows.length + " selected";
					} else {
						$scope.selectedValue = defaultValue;
					}
				});

				// edge detection for dropdown, so it doesn't overflow page
				$scope.edgeDetection = function($event) {
					var $button = $(event.target);
					var $dropdown = $($event.target).next();
					if ($button.offset().left + $dropdown.width() > $(window).width()-15) {
						$dropdown.css("left", ($(window).width() - $button.offset().left - $dropdown.width() - 15) + "px");
					} else {
						$dropdown.css("left", "0");
					}   
				}
			}]
		}
	};
	dropdown.$inject = [];

	module.directive('dropdown', dropdown);

    return module;

});