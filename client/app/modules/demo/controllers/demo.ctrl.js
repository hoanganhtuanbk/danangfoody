'use strict';
angular
  .module('com.module.demo')
  .controller('demo', function($scope,$modal,$rootScope) {
    $rootScope.step = 0;
    function OpenModal(cb) {          
      $modal.open({
            animation: false,                                //voi 3 step thi co the chi can define 3 controller 3 step.
            templateUrl: 'modules/demo/views/modal.html',
            controller: 'modalMultiStep',
            size: 'sl'
      });
      cb()
    }

    $scope.openModal = function() {
      OpenModal(function() {
        $rootScope.step = 0;
      });
    };
  })
  .controller('modalMultiStep', function($scope,$modal,$modalInstance,$rootScope) {
    $rootScope.step += 1;
    $scope.templateUrl = [
      'modules/demo/views/modal.html',
      'modules/demo/views/modal-step2.html',
      'modules/demo/views/modal-step3.html'
    ];
    $scope.selectedMonth ='Month..';
    $scope.months = [
      'Month..',1,2,3,4,5,6,7,8,9,10,11,12
    ];
    $scope.selectedYear ='Year..';
    $scope.years = [
      'Year..',2016,2017,2018,2019,2020,2021,2022,2023,2024,2025
    ];
    $scope.backStep = 'Back';
    function openModal(cb) {
      $modal.open({
            animation: false,
            templateUrl: $scope.templateUrl[$rootScope.step],
            controller: 'modalMultiStep',
            size: 'sl'
             
        });
    }
    if ($rootScope.step < 3) {
      $scope.nextStep = 'Continue';
      $scope.nextModal = function() {
        $modalInstance.dismiss();
        openModal();
      };
      $scope.backModal = function() {
        $modalInstance.close();
        $rootScope.step-=2;
        openModal();
      };
    } else {
      $scope.nextStep = 'Finish';
      $scope.nextModal = function() {
        $modalInstance.close();
      };
      $scope.backModal = function() {
        $modalInstance.close();
        $rootScope.step-=2;
        openModal();
      };
    }
  
    $scope.closeModal = function() {
      $modalInstance.close();
    };
  });