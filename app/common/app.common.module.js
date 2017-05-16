define([
    'app/common/qlik-app.service', 
    'app/common/sense-object/sense-object.component', 
    'app/common/search/search.component', 
    'app/common/dropdown/dropdown.component'
], function(QlikAppService, SenseObjectComponent, SearchComponent, DropdownComponent) {
	angular
		.module('app.common', [])
		.service('qlikApp', QlikAppService)
        .component('senseObject', SenseObjectComponent)
        .component('search', SearchComponent)
        .component('dropdown', DropdownComponent);
});