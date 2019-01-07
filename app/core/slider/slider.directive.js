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
      step: '@?'
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