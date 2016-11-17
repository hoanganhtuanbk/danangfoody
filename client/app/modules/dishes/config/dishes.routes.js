(function () {
  'use strict';
  angular
    .module('com.module.dishes')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.dishes', {
          abstract: true,
          url: '/dishes',
          templateUrl: 'modules/dishes/views/main.html'
        })
        .state('app.dishes.list', {
          url: '',
          templateUrl: 'modules/dishes/views/list.html',
          controllerAs: 'ctrl',
          controller: 'DishCtrl'
        })
        .state('app.dishes.add', {
          url: '/add',
          templateUrl: 'modules/dishes/views/form.html',
          controllerAs: 'ctrl',
          controller: 'DishCtrl'
        })
        .state('app.dishes.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/dishes/views/config.html',
          controllerAs: 'ctrl',
          controller: 'DishCtrl'
        })
    }
  );

})();
