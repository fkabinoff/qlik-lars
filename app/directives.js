define([], function() { 
    
	var directives = {};


	/*
	* Qlik Sense object
	*/
	directives.senseObjectDirective = function(qlikApp) {
		return {
			restrict: "E",
			template:"<div class='sense-object'></div>",
			controller: ['$scope', '$attrs', '$element', 'qlikApp', function($scope, $attrs, $element, qlikApp) {
				var height = $attrs.height ? $attrs.height + "px" : "300px";
				$element.find("div").css("height", height);
				
				qlikApp.app.getObject($element.find("div")[0], $attrs.id).then(function(model) {
					$scope.model = model;
				});

				//closes object on scope change
				$scope.$on('$destroy', function() {
					$scope.model.close();
				});

			}]
		}
	}
	directives.senseObjectDirective.$inject = ['qlikApp'];


	/*
	*	Search bar that returns results from app in dropdown, and can be selected.
	*/
    directives.searchDirective = function() {
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
	directives.searchDirective.$inject = [];


	/*
	*	Dropdown that displays list, allows selections, and allows styling of selections
	*/
	directives.dropdownDirective = function() {
		return {
			restrict: "E",
			template: "<div class='dropdown-directive btn-group' uib-dropdown is-open='status.isopen'><button type='button' class='btn btn-primary dropdown-toggle' uib-dropdown-toggle ng-disabled='disabled' ng-click='edgeDetection($event)'> {{selectedValue}} <span class='caret'></span></button><ul vs-repeat vs-excess='10' class='dropdown-menu' uib-dropdown-menu role='menu' ng-style='styles'><li ng-class='row.qState' ng-repeat='row in rows' ng-click='selectRow(row)' class=''><a href='javascript:void(0);'>{{row.qText}}</a></li></ul></div>",
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
	directives.dropdownDirective.$inject = [];

    return directives;
});
