'use strict';
angular
  .module('com.module.index')
  .config(function($stateProvider) {
    $stateProvider
        .state('from-ID-1', {
            url: '/from/1',
            controller: function($rootScope,$state) {
                $rootScope.from = 'Mai linh Taxi';
                //$rootScope.fromImage = 'Logo_Novotel_Hotels.svg.png';
                console.log('From:  ', $rootScope.from);
                $state.go('home');
            }
        })
        .state('from-ID-2', {
            url: '/from/2',
            controller: function($rootScope,$state) {
                $rootScope.from = 'Vina Sun Taxi';
                console.log('From:  ', $rootScope.from);
                $state.go('home');
            }
        })
        .state('from-ID-3', {
            url: '/from/3',
            controller: function($rootScope,$state) {
                $rootScope.from = 'Tien Sa Taxi';
                console.log('From:  ', $rootScope.from);
                $state.go('home');
            }
        })
        .state('from-ID-4', {
            url: '/from/4',
            controller: function($rootScope,$state) {
                $rootScope.from = 'DTT2B Hotel';
                console.log('From:  ', $rootScope.from);
                $state.go('home');
            }
        })
        .state('from-ID-5', {
            url: '/from/5',
            controller: function($rootScope,$state) {
                $rootScope.from = 'Da Nang International Airport';
                console.log('From:  ', $rootScope.from);
                $state.go('home');
            }
        })
        .state('from-ID-6', {
            url: '/from/6',
            controller: function($rootScope,$state) {
                $rootScope.from = 'Da Nang Tourism Department';
                console.log('From:  ', $rootScope.from);
                $state.go('home');
            }
        })
        .state('from-ID-7', {
            url: '/from/7',
            controller: function($rootScope,$state) {
                $rootScope.from = 'Da Nang Visitors Center';
                console.log('From:  ', $rootScope.from);
                $state.go('home');
            }
        })
      	.state('home', {
        	url: '/home',
	        views:{
	          '':{templateUrl :'modules/index/views/home.html'},
	          'home_header@home':{
	            templateUrl: 'modules/index/views/home_header.html',
	            controller: 'index'
	          },
	          'home_infotour@home': {
	            templateUrl: 'modules/index/views/home_infotour.html',
	            controller: ''
	          },
	          'home_ss3slide@home': {
	            templateUrl: 'modules/index/views/home_ss3slide.html',
	            controller: 'ss3slides'
	          },
	          'home_ss2info@home': {
	            templateUrl: 'modules/index/views/home_ss2info.html',
	            controller: 'ss2info'
	          },
	          'home_weoffer@home': {
	            templateUrl: 'modules/index/views/home_weoffer.html',
	            controller: ''
	          }
        }});
  });
