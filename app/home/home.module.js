define(['app/home/home.routes', 'app/home/home.component'], function(routes, HomeComponent) {
  angular.module('home', [])
    .config(routes)
    .component('home', HomeComponent);
});