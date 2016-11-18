'use strict';
angular
  .module('com.module.index')
  .config(function($stateProvider,$locationProvider) {
    $stateProvider
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
	            controller: 'weofferCtl'
	          }
        }})
        //From state group
        .state('fromNovotel', {
        	url: '/from/novotel',
        	controller: function($rootScope,$state) {
        		$rootScope.from = 'novotel';
        		$rootScope.fromImage = 'Logo_Novotel_Hotels.svg.png';
        		console.log('From:  ', $rootScope.from);
        		$state.go('home');
        	}
        });
	  // $locationProvider.html5Mode(true);

  });