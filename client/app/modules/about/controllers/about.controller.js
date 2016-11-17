(function () {
    'use strict';
    angular
        .module('com.module.about')
        /**
         * @ngdoc function
         * @name com.module.about.controller:AboutCtrl
         * @description
         * # AboutCtrl
         * Controller of the clientApp
         */
        .controller('AboutCtrl', function ($scope, About, Upload, CoreService, $state, $rootScope) {
            //------------------------Get-Data-about---------------------------------------
            var getdata = function () {
                About.find({filter: {order: 'id DESC '}}, function (data) {
                    $scope.aboutdata = data;

                })
            };

            var addAbout = function (model) {
                if ($scope.img1) {
                    $scope.img1.upload = Upload.upload({
                        url: CoreService.env.apiUrl + '/containers/aboutpic/upload',
                        data: {
                            file: $scope.img1
                        }
                    });
                    model.who.image = CoreService.env.apiUrl + '/containers/aboutpic/download/' + $scope.img1.name;
                }
                if ($scope.img2) {
                    $scope.img2.upload = Upload.upload({
                        url: CoreService.env.apiUrl + '/containers/aboutpic/upload',
                        data: {
                            file: $scope.img2
                        }
                    });
                    model.what.image = CoreService.env.apiUrl + '/containers/aboutpic/download/' + $scope.img2.name;
                }
                if ($scope.img3) {
                    $scope.img3.upload = Upload.upload({
                        url: CoreService.env.apiUrl + '/containers/aboutpic/upload',
                        data: {
                            file: $scope.img3
                        }
                    });
                    model.where.image = CoreService.env.apiUrl + '/containers/aboutpic/download/' + $scope.img3.name;
                }
                if ($scope.img4) {
                    $scope.img4.upload = Upload.upload({
                        url: CoreService.env.apiUrl + '/containers/aboutpic/upload',
                        data: {
                            file: $scope.img4
                        }
                    });
                    model.why.image = CoreService.env.apiUrl + '/containers/aboutpic/download/' + $scope.img4.name;
                }
                var time = new Date(new Date().getTime()).toLocaleString(); // 11/16/2015, 11:18:48 PM
                About.create({
                    title: model.title,
                    time: time,
                    who: {
                        content: model.who.content,
                        image: model.who.image
                    },
                    what: {
                        content: model.what.content,
                        image: model.what.image
                    },
                    where: {
                        content: model.where.content,
                        image: model.where.image
                    },
                    why: {
                        content: model.why.content,
                        image: model.why.image
                    }
                });
            };

            getdata();
            //------------------------State-View---------------------------------------
            $scope.stateConfigView = function (id) {
                $rootScope.currentAbout={};
                About.findById({id: id}, function (res) {
                    $rootScope.currentAbout = res;
                });

            };

            //------------------------Delete-about---------------------------------------
            $scope.deleteAbout = function (id) {
                About.deleteById({id: id}, function () {
                    getdata();
                })
            };
            $scope.updateAbout = function () {
                addAbout($rootScope.currentAbout);
                $state.go('^.index')
            };
            //------------------------Ađd-about---------------------------------------
            $scope.addAbout = function () {
                addAbout($scope.about);
                $state.go('^.index')
            }
        });

})();
