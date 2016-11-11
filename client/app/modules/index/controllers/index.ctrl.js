'use strict';
angular
  .module('com.module.index')
  .controller('demo', function($scope,$modal) {
    $scope.openModal = function() {
        $modal.open({
            animation: true,
            templateUrl: 'modules/index/views/modal.html',
            controller: function() {},
        });
    };
  });