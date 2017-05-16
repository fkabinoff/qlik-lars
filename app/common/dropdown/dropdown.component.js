define(['text!app/common/dropdown/dropdown.component.html'], function(template) {
  return {
    template: template,
    bindings:{
      field: "@",
      toggle: "="
    },
    controller: ['$scope', '$attrs','qlikApp', function($scope, $attrs, qlikApp) {
      var vm = this;
      vm.styles = {width: $attrs.width ? $attrs.width + "px" : "200px"}; // Default to 200px width for dropdown if 'width' attribute not set
      // creates list object
      qlikApp.createList({
        "qDef": {
          "qFieldDefs": ["[" + vm.field + "]"],
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
        vm.rows = _.flatten(reply.qListObject.qDataPages[0].qMatrix).filter(function(row) { return row.qText !== "Toronto Blue Jays"; });
      }, $scope);
      // handles selections, if 'toggle' attribute set to true, then toggles selections
      vm.selectRow=function(row){
        if (vm.toggle == true) {
          qlikApp.app.field(vm.field).select([row.qElemNumber], true);
        } else {
          qlikApp.app.field(vm.field).select([row.qElemNumber], false);
        }
        $("ul").scrollTop(0);
      }
      // updates value of button
      $scope.$watchCollection('$ctrl.rows', function(rows) {
        var defaultValue = $attrs.name ? $attrs.name : $attrs.field;
        if(rows == undefined) { 
          vm.selectedValue = defaultValue;
          return; 
        }
        vm.selectedRows = rows.filter(function(row) { return row.qState === "S" });
        if (vm.selectedRows.length === 1) {
          vm.selectedValue = vm.selectedRows[0].qText;
        } else if (vm.selectedRows.length > 1) {
          vm.selectedValue = defaultValue + ": " + vm.selectedRows.length + " selected";
        } else {
          vm.selectedValue = defaultValue;
        }
      });
      // edge detection for dropdown, so it doesn't overflow page
      vm.edgeDetection = function($event) {
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
});