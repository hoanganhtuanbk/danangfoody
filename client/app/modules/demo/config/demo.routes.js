'use strict';
angular
  .module('com.module.demo')
  .config(function($stateProvider) {
    $stateProvider
      .state('demo', {
      	url: '/demo',
      	templateUrl: 'modules/demo/views/demo.html',
      	controller: 'demo2'
      });
  });