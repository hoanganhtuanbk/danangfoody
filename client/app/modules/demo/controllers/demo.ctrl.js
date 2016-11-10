'use strict';
angular
  .module('com.module.demo')
  .controller('demo', function($scope,$modal,$rootScope) {
    $scope.stepOriginal = 0
    $rootScope.step = $scope.stepOriginal;
    function OpenModal(cb) {          
      $modal.open({
            animation: true,                                //voi 3 step thi co the chi can define 3 controller 3 step.
            templateUrl: 'modules/demo/views/modal.html',
            controller: 'demo2'
      });
      cb()
    }

    $scope.openModal = function() {
      OpenModal(function() {
        $rootScope.step = 0;
      });
    };
  })
  .controller('demo2', function($scope,$modal,$modalInstance,$rootScope) {
    $rootScope.step += 1;
    function OpenModal(cb) {
      $modal.open({
            animation: true,
            templateUrl: 'modules/demo/views/modal.html',
            controller: 'demo2'
             
        });

    }
    $scope.openModal = function() {
      $modalInstance.close();
      OpenModal();
    };
  });