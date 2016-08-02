define(['app/qlikApp/qlikApp'], function() {

    var module = angular.module('senseObject', ['qlikApp']);

	/*
	* Qlik Sense object
	*/
	var senseObject = function(qlikApp) {
		return {
			restrict: "E",
			templateUrl: "app/senseObject/senseObject.html",
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
	senseObject.$inject = ['qlikApp'];

	module.directive('senseObject', senseObject);

    return module;

});