'use strict';
angular
  .module('com.module.index')
  .config(function($stateProvider) {
    $stateProvider
      .state('index', {
      	url: '/index',
      	templateUrl: 'modules/index/views/index.html',
      	controller: 'demo'
      });
  });