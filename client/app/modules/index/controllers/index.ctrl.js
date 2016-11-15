'use strict';
angular
  .module('com.module.index')
  .controller('index', function($scope,$modal,$rootScope) {
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
    $scope.ss2showinfos =[ 
    {
      ss2id : 'myShowinfo1',
      ss2title: 'Lorem ipsum dolor sit amet',
      ss2image: '/images/Walking.jpg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    },
    {
      ss2id : 'myShowinfo2',
      ss2title: 'Lorem ipsum dolor sit amet',
      ss2image: '/images/Taxi.jpeg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    },
    {
      ss2id : 'myShowinfo3',
      ss2title: 'Lorem ipsum dolor sit amet',
      ss2image: '/images/Cyclo.jpg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    }
    ];
    
  })
  .controller('ss3slide', function($scope) {
    $scope.slides =[ 
    {
      ss3image1: '/images/1.jpg',
      ss3image2: '/images/2.jpg',
      ss3image3: '/images/3.jpg'
    },
    {
      ss3image1: '/images/2.jpg',
      ss3image2: '/images/3.jpg',
      ss3image3: '/images/4.jpg'
    },
    {
      ss3image1: '/images/3.jpg',
      ss3image2: '/images/4.jpg',
      ss3image3: '/images/5.jpg'
    },
    {
      ss3image1: '/images/4.jpg',
      ss3image2: '/images/5.jpg',
      ss3image3: '/images/6.jpg'
    },
    {
      ss3image1: '/images/5.jpg',
      ss3image2: '/images/6.jpg',
      ss3image3: '/images/7.jpg'
    },
    {
      ss3image1: '/images/6.jpg',
      ss3image2: '/images/7.jpg',
      ss3image3: '/images/1.jpg'
    },
    {
      ss3image1: '/images/7.jpg',
      ss3image2: '/images/1.jpg',
      ss3image3: '/images/2.jpg' 
    } 
    ];
    
  })

