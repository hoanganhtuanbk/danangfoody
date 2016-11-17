'use strict';
angular
    .module('com.module.index')
    .controller('weofferCtl', function($scope,$rootScope, About) {
        About.find({filter:{ order: 'id DESC ', limit: 1}},function (data) {
            $scope.aboutUs = data;

        })

    });