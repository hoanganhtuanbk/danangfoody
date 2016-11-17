(function () {
    'use strict';
    angular
        .module('com.module.about')
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.about', {
                    abstract: true,
                    url: '/about',
                    templateUrl: 'modules/about/views/main.html'
                })
                .state('app.about.index', {
                    url: '/index',
                    templateUrl: 'modules/about/views/about.html',
                    controller: 'AboutCtrl'
                })
                .state('app.about.add', {
                    url: '/add',
                    templateUrl: 'modules/about/views/add.html',
                    controller: 'AboutCtrl'
                })
                .state('app.about.config', {
                    url: '/:id/config',
                    templateUrl: 'modules/about/views/config.html',
                    controller: 'AboutCtrl'
                })
                .state('app.about.view', {
                    url: '/:id/view',
                    templateUrl: 'modules/about/views/view.html',
                    controller: 'AboutCtrl'

                })
            ;
        });

})();
