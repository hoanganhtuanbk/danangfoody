(function () {
  'use strict';
  angular
    .module('com.module.index')
    .config(function ($stateProvider) {
      $stateProvider
        .state('index', {
          abstract: true,
          url: '',
          templateUrl: 'modules/index/views/main.html',
          controller: 'HomeCtrl'
        })
        .state('index.homepage', {
          
          url: '/homepage',
          templateUrl: 'modules/index/views/homepage.html'
        })
        .state('index.price', {
          url: '/price',
          templateUrl: 'modules/index/views/price.html',
          controller: "PriceCtrl"
        });
    });

})();
