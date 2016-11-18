'use strict';
angular
    .module('com.module.index')
    .controller('weofferCtl', function($scope,$rootScope) {
       $scope.offerTitle = "Enjoying great food and wine is two of life's great pleasures and we sincerely hope that you experience both during your time with us ...today and always!";
        $scope.offerItem= [
            {
                title: 'WHO',
                imgUrl: 'images/who.png',
                content: 'The atmosphere of real Italy rules the mood at our restaurant. We offer you not only the best recipes of typical Italian dishes also the'
            },
            {
                title: 'WHAT',
                imgUrl: 'images/what.png',
                content: 'The atmosphere of real Italy rules the mood at our restaurant. We offer you not only the best recipes of typical Italian dishes also he'
            },
            {
                title: 'WHERE',
                imgUrl: 'images/where.png',
                content: 'The atmosphere of real Italy rules the mood at our restaurant. We offer you not only the best recipes of typical Italian dishes also the'
            },
            {
                title: 'WHY',
                imgUrl: 'images/why.png',
                content: 'The atmosphere of real Italy rules the mood at our restaurant. We offer you not only the best recipes of typical Italian dishes also the'
            }
        ]
    });