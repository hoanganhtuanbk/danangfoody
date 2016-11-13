'use strict';
angular
    .module('com.module.index')
    .controller('weofferCtl', function($scope,$rootScope) {
       $scope.offerTitle = "ENJOYING GREAT FOOD AND WINE IS TWO OF LIFE'S GREAT PLEASURES AND WE SINCERELY HOPE THAT YOU EXPERIENCE BOTH DURING YOUR TIME WITH US ...TODAY AND ALWAYS!";
        $scope.offerItem= [
            {
                title: 'WHO',
                imgUrl: 'images/circle-of-friends-icon-png-24427.png',
                content: 'The atmosphere of real Italy rules the mood at our restaurant. We offer you not only the best recipes of typical Italian dishes also the'
            },
            {
                title: 'WHAT',
                imgUrl: 'images/food-png-2958.png',
                content: 'The atmosphere of real Italy rules the mood at our restaurant. We offer you not only the best recipes of typical Italian dishes also he'
            },
            {
                title: 'WHERE',
                imgUrl: 'images/iconStorelocatorLight.svg',
                content: 'The atmosphere of real Italy rules the mood at our restaurant. We offer you not only the best recipes of typical Italian dishes also the'
            },
            {
                title: 'WHY',
                imgUrl: 'images/food-png-2958.png',
                content: 'The atmosphere of real Italy rules the mood at our restaurant. We offer you not only the best recipes of typical Italian dishes also the'
            }
        ]
    });