'use strict';
angular
  .module('com.module.index')
  .controller('index', function($scope,$modal,$rootScope,$translate) {
    $rootScope.step = 0;
    $rootScope.tourId = 1;
    function OpenModal(cb) {
      $modal.open({
        animation: false,
        templateUrl: 'modules/index/views/booking-modal/modal-step1.html',
        controller: 'modal3Step',
        size: 'lg'
      });
      cb()
    }
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

    $scope.openModal = function() {
      OpenModal(function() {
        $rootScope.step = 0;
      });
    };
  })
  .controller('ss2info', function($scope,$modal, $rootScope) {
    //////booking modal data
    $rootScope.step = 0;
    $rootScope.tourId = 1;
    function OpenModal(cb) {
      $modal.open({
        animation: false,
        templateUrl: 'modules/index/views/booking-modal/modal-step1.html',
        controller: 'modal3Step',
        size: 'lg'
      });
      cb()
    }

    $scope.openModal = function() {
      OpenModal(function() {
        $rootScope.step = 0;
      });

    };
    //////
    // $scope.ss2showinfos =[
    //   {
    //     ss2title: 'Walking',
    //     ss2image: 'images/Walking.jpg',
    //     ss2content:'Our signature <strong>FOODY STORY TOUR</strong> for those who are not afraid to put some mileage on their flip flops, who wish to walk off some extra calories from indulging in the 7 sinfully delicious dishes.'
    //   },
    //   {
    //     ss2title: 'Cyclo',
    //     ss2image: 'images/Cyclo.jpg',
    //     ss2content:'How about a piece of Vietnamese history and some interesting photo ops while enjoying your <strong>FOODY STORY TOUR</strong> ? Cyclo is a three-wheeled bicycle taxi that will bring you back to the French colonial times. You will enjoy the tour in a truly colonial fashion'
    //   },
    //   {
    //     ss2title: 'Taxi',
    //     ss2image: 'images/Taxi.jpg',
    //     ss2content:'Have a group of friends or your hotel is far from the city center? <strong>FOODY STORY TOUR</strong> by taxi offers door-to-door pickup and drop off service for those who desire comfort while enjoying the show.'
    //   }
    //
    // ];

  })
  .controller('ss3slides', function($scope) {
    $scope.slides =[
      {
        ss3image1: 'images/1.jpg',
        ss3image2: 'images/2.jpg',
        ss3image3: 'images/3.jpg'
      },
      {
        ss3image1: 'images/2.jpg',
        ss3image2: 'images/3.jpg',
        ss3image3: 'images/4.jpg'
      },
      {
        ss3image1: 'images/3.jpg',
        ss3image2: 'images/4.jpg',
        ss3image3: 'images/5.jpg'
      },
      {
        ss3image1: 'images/4.jpg',
        ss3image2: 'images/5.jpg',
        ss3image3: 'images/6.jpg'
      },
      {
        ss3image1: 'images/5.jpg',
        ss3image2: 'images/6.jpg',
        ss3image3: 'images/7.jpg'
      },
      {
        ss3image1: 'images/6.jpg',
        ss3image2: 'images/7.jpg',
        ss3image3: 'images/1.jpg'
      },
      {
        ss3image1: 'images/7.jpg',
        ss3image2: 'images/1.jpg',
        ss3image3: 'images/2.jpg'
      }
    ];

  });

