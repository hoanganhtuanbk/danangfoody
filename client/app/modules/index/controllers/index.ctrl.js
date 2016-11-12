'use strict';
angular
  .module('com.module.index')
  .controller('demo', function($scope,$modal,$rootScope) {
    $rootScope.step = 0;
    function OpenModal(cb) {          
      $modal.open({
            animation: false,                                //voi 3 step thi co the chi can define 3 controller 3 step.
            templateUrl: 'modules/index/views/booking-modal/modal-step1.html',
            controller: 'modalMultiStep',
            size: 'lg'
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
    //Calendar in step 1
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.options = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }
    //date in step 2 and 3
    $rootScope.step += 1;
    $scope.templateUrl = [
      'modules/index/views/booking-modal/modal-step1.html',
      'modules/index/views/booking-modal/modal-step2.html',
      'modules/index/views/booking-modal/modal-step3.html'
    ];

    $scope.selectedMonth ='Month..';
    $scope.months = [
      'Month..',1,2,3,4,5,6,7,8,9,10,11,12
    ];

    $scope.selectedYear ='Year..';
    $scope.years = [
      'Year..',2016,2017,2018,2019,2020,2021,2022,2023,2024,2025
    ];
    //
    $scope.backStep = 'Back';
    function openModal(cb) {
      $modal.open({
            animation: false,
            templateUrl: $scope.templateUrl[$rootScope.step],
            controller: 'modalMultiStep',
            size: 'lg'
             
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