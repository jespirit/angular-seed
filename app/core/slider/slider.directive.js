'use strict';

angular.module('myApp.slider', [])

.directive('mySlider', function() {
  return {
    restrict: 'E',
    // pass the controller instance to the `link` function
    require: 'mySlider',
    scope: {
      inputId: '@',
      // options{}
      id: '@?sliderId',
      // if required and not set, then `min` property will be set to `undefined`
      min: '@',
      max: '@?',
      value: '@?',
      step: '@?',
      change: '&?onChange'
    },
    // controller is instantiated before the pre-linking phase
    controller: function($scope, $element, $attrs) {
      var scope = $scope;
      $scope.ctrlProp = 'Hi controller!';
      this.ctrlCustom = 'custom property on controller';
    },
    /**
     * `scope`
     * These local properties are useful for aliasing values for templates.
     */
    link: function(scope, element, attrs, ctrl) {
      /* var input =  */
      // .append() returns the target element/container
      element.append(`<input type="text" id="${scope.inputId}"/>`);
      var mySlider = new Slider('#'+scope.inputId, scope);
      // _trigger() -> callbackFn(val)
      if (scope.change) {
        mySlider.on('change', function(valueObj) {
          // $apply([expr])
          // eg. ng-click="close({message: 'closing for now'})""
          // scope.$apply(`change({valueObj: {oldValue: ${valueObj.oldValue}, newValue: ${valueObj.newValue}}})`);
          scope.$apply(function(scope) {
            scope.change({valueObj: valueObj});
          });
        });
      }

      // See https://docs.angularjs.org/guide/directive#creating-a-directive-that-manipulates-the-dom
      element.on('$destroy', function() {
        mySlider.destroy();
      });
    },
    // Note: The template is cloned but is NOT interpolated, so you get the raw template.
    // Remember, interpolation is also a directive, and as a result, the template may or
    // may not be fully ready.
    // <input type="text" id="{{inputId}}">
    /**
     * During the linking phase, the interpolation hasn't been evaluated yet.
     * https://docs.angularjs.org/api/ng/service/$compile#attributes
     */
    // template: '<input type="text" id="{{inputId}}"/>'
  };
});