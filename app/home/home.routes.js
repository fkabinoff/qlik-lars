define([], function() { 
  function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        template: "<home></home>"
      });
    $urlRouterProvider.otherwise("/");
  }
  routes.$inject=['$stateProvider', '$urlRouterProvider'];

  return routes;
});