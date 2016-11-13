'use strict';
angular
  .module('com.module.index')
  .config(function($stateProvider) {
    $stateProvider
      	.state('index', {
	    	url: '/index',
	      	templateUrl: 'modules/index/views/index.html',
	      	controller: 'demo'
	    })
      	.state('home', {
        	url: '/home',
	        views:{
	          '':{templateUrl :'modules/index/views/home.html'},
	          'home_header@home':{
	            templateUrl: 'modules/index/views/home_header.html',
	            controller: 'demo'
	          },
	          'home_ss2info@home': {
	            templateUrl: 'modules/index/views/home_ss2info.html',
	            controller: 'ss2info'
	          },
	          'home_ss3slide@home': {
	            templateUrl: 'modules/index/views/home_ss3slide.html',
	            controller: 'ss3slide'
	          },
	          'home_weoffer@home': {
	            templateUrl: 'modules/index/views/home_weoffer.html',
	            controller: 'weofferCtl',
	          }

        }})

  });