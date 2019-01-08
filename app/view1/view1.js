'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$window', function($scope, $window) {
  $scope.onSliderChange = function(valueObj) {
    $window.console.log(`changed: old: ${valueObj.oldValue}, new: ${valueObj.newValue}`);
  };
  $scope.msg = 'message from View1Ctrl';
}]);