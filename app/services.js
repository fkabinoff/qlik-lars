define([], function() { 
	
	var services = {};

	services.qlikAppService = function($q) {
		//opens Qlik Sense app with appId and config set in main.js
		var app = qlik.openApp(appId, config);
		this.app = app;

		/*
		* mimicks qlik sense app api createCube() 
		* adds functionality to destroy session object on scope destroy 
		* add any other custom behavior desired to be applied to every hypercube
		*/
		this.createCube = function(params, callback) {
			var deferred = $q.defer();
			app.createCube({
				qStateName: params.qStateName,
				qDimensions: params.qDimensions,
				qMeasures: params.qMeasures,
				qInterColumnSortOrder: params.qInterColumnSortOrder,
				qSuppressZero: params.qSuppressZero,
				qSuppressMissing: params.qSuppressMissing,
				qInitialDataFetch: params.qInitialDataFetch,
				qMode: params.qMode,
				qNoOfLeftDims: params.qNoOfLeftDims,
				qAlwaysFullyExpanded: params.qAlwaysFullyExpanded,
				qMaxStackedCells: params.qMaxStackedCells,
				qPopulateMissing: params.qPopulateMissing,
				qShowTotalsAbove: params.qShowTotalsAbove,
				qIndentMode: params.qIndentMode,
				qCalcCond: params.qCalcCond,
				qSortbyYValue: params.qSortbyYValue
			}, function(reply) {
				callback(reply);
			}).then(function(model) {
				deferred.resolve(model);
				if(params.scope) {
					params.scope.$on('$destroy', function() {
						app.destroySessionObject(model.id);
					});
				}
			});
			return deferred.promise;
		}
	};
	services.qlikAppService.$inject = ['$q'];

	return services;
});
