/**
 * Created by nguyenvunamphuc on 17/11/2016.
 */
(function () {
    'use strict';
    angular
        .module('com.module.dishes')
        /**
         * @ngdoc function
         * @name com.module.about.controller:AboutCtrl
         * @description
         * # AboutCtrl
         * Controller of the clientApp
         */
        .controller('DishCtrl', function ($scope, Dish, Upload, CoreService, $state, $rootScope, $http, FileUploader) {
            var getData = function () {
                Dish.find(function (res) {
                    $scope.dishData = res;
                })
            };
            getData();

            var addDish = function (model) {
                if ($scope.image) {

                    $scope.image.upload = Upload.upload({
                        url: CoreService.env.apiUrl + 'containers/dishespic/upload',
                        data: {
                            file: $scope.image
                        }
                    });
                    model.imgurl = CoreService.env.apiUrl + 'containers/dishespic/download/' + $scope.image.name;
                    $scope.img = $scope.image.name;


                }
                var time = new Date(new Date().getTime()).toLocaleString(); // 11/16/2015, 11:18:48 PM
                Dish.create({
                    name: model.name,
                    caption: model.caption,
                    imgurl: model.imgurl,
                    img: $scope.img,
                    time: time
                })
            };
            //state-to-config-view---------------
            $scope.stateConfigView = function (item) {
                Dish.findById({id: item.id}, function (res) {
                    $rootScope.currentDish = res;
                    $state.go('^.edit')
                })
            };
            //add-new-dish---------------
            $scope.addDish = function () {
                addDish($scope.newDish);
                $state.go('^.list')
            };
            //delete--dish---------------
            $scope.deleteDish = function (item) {
                if (item.img) {
                    $http.delete(CoreService.env.apiUrl + '/containers/dishespic/files/' + encodeURIComponent(item.img));
                }
                Dish.deleteById({id: item.id}, function () {
                    getData();
                });

            };
            //modify--dish---------------
            $scope.modifyDish = function () {
                $scope.deleteDish($rootScope.currentDish);
                addDish($rootScope.currentDish);
                $state.go('^.list')
            }
        })
})();
