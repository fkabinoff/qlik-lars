require({context: 'app'}, ['app/app.component', 'app/common/app.common.module', 'app/home/home.module'], function(AppComponent) { 
  angular
    .module('app', ['ui.router', 'ui.bootstrap', 'app.common', 'home'])
    .component('app', AppComponent);
  angular.bootstrap(document, ["app", "qlik-angular"]);
});