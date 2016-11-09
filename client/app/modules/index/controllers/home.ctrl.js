(function () {
  'use strict';
  angular
    .module('com.module.index')
    .controller('HomeCtrl', function ($scope) {
      $scope.modal = false;
      $scope.click = function () {
        $scope.modal = true
      };
    })
    .directive('modal', function(){
    return {
      restrict: 'E',
      replace: true,
      scope:{
        message: '=',
        show:'='
      },
      controller: function($scope){
        $scope.hide = function() {$scope.show = false;}
      },
      transclude: true,
      templateUrl: "modules/index/views/test.html"
    };
})
}) ();
