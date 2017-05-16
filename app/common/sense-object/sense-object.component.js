define(['text!app/common/sense-object/sense-object.component.html'], function(template) {
  return {
    template: template,
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
});