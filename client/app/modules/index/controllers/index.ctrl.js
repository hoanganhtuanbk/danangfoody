'use strict';
angular
  .module('com.module.index')
  .controller('index', function($scope,$modal,$rootScope) {
    $rootScope.step = 0;
    $rootScope.tourId = 1;
    function OpenModal(cb) {          
      $modal.open({
            animation: false,                                //voi 3 step thi co the chi can define 3 controller 3 step.
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
  .controller('ss2info', function($scope) {
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
      ss3id : 'myShowinfo7',
      ss3numberdata: '0',
      ss3image: '/images/7.jpg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    },
    {
      ss3id : 'myShowinfo1',
      ss3numberdata: '1',
      ss3image: '/images/1.jpg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    },
    {
      ss3id : 'myShowinfo1',
      ss3numberdata: '2',
      ss3image: '/images/2.jpg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    },
    {
      ss3id : 'myShowinfo1',
      ss3numberdata: '3',
      ss3image: '/images/3.jpg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    },
    {
      ss3id : 'myShowinfo1',
      ss3numberdata: '4',
      ss3image: '/images/4.jpg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    },
    {
      ss3id : 'myShowinfo1',
      ss3numberdata: '5',
      ss3image: '/images/5.jpg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    },
    {
      ss3id : 'myShowinfo1',
      ss3numberdata: '6',
      ss3image: '/images/6.jpg',
      ss2content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, necessitatibus, accusantium, aliquam, magni illo repellendus molestiae accusamus officiis.'
    } 
    ];
    
  });

