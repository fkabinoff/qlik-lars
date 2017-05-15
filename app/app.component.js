define(['text!./app.component.html'], function(html) {
    return function() {
		return {
			restrict: "E",
			template: html,
			controller: ['$scope', function($scope) {

            }]
		}
	}
});