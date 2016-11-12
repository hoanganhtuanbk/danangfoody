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

	          'home_weoffer@home': {
	            templateUrl: 'modules/index/views/home_weoffer.html',
	            controller: 'demo'
	          },
	          'home_ss2info@home': {
	            templateUrl: 'modules/index/views/home_ss2info.html',
	            controller: 'demo'
	          }
        }})

  });